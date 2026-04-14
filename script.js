const initializeSite = async () => {
  const siteData = await window.SiteDataStore.load();
  const { business, links, trustItems, stockStats, catalogFilters, categories, promotions, branches, products, benefits, testimonials, socialHighlights } = siteData;

  const ITEMS_PER_PAGE = 12;
  const FAVORITES_KEY = "optica-del-rey-favorites";

  const buildWhatsAppUrl = (number, message) => {
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${number}?text=${encodedMessage}`;
  };

  const buildBranchMessage = (message, city) => `${message} para la sucursal de ${city}.`;

  const categoriesGrid = document.querySelector("#categories-grid");
  const promotionsGrid = document.querySelector("#promotions-grid");
  const productGrid = document.querySelector("#product-grid");
  const catalogControls = document.querySelector("#catalog-controls");
  const catalogSearchInput = document.querySelector("#catalog-search");
  const catalogSortSelect = document.querySelector("#catalog-sort");
  const catalogBrandSelect = document.querySelector("#catalog-brand");
  const catalogLensTypeSelect = document.querySelector("#catalog-lens-type");
  const catalogFavoritesOnly = document.querySelector("#catalog-favorites-only");
  const catalogHighlights = document.querySelector("#catalog-highlights");
  const catalogResults = document.querySelector("#catalog-results");
  const catalogPagination = document.querySelector("#catalog-pagination");
  const catalogSection = document.querySelector("#catalogo");
  const benefitsGrid = document.querySelector("#benefits-grid");
  const testimonialsGrid = document.querySelector("#testimonials-grid");
  const branchesGrid = document.querySelector("#branches-grid");
  const instagramGrid = document.querySelector("#instagram-grid");
  const contactBranches = document.querySelector("#contact-branches");
  const paymentMethodsNode = document.querySelector("#payment-methods");
  const whatsappModal = document.querySelector("#whatsapp-modal");
  const branchOptions = document.querySelector("#branch-options");
  const messagePreview = document.querySelector("#message-preview");
  const stockStatsGrid = document.querySelector("#stock-stats");
  const productModal = document.querySelector("#product-modal");
  const productModalImage = document.querySelector("#product-modal-image");
  const productModalMedia = document.querySelector(".product-modal__media");
  const productModalThumbs = document.querySelector("#product-modal-thumbs");
  const productModalPrevImage = document.querySelector("#product-modal-prev-image");
  const productModalNextImage = document.querySelector("#product-modal-next-image");
  const productModalCounter = document.querySelector("#product-modal-counter");
  const productModalRotate = document.querySelector("#product-modal-rotate");
  const productModalZoom = document.querySelector("#product-modal-zoom");
  const productModalBadge = document.querySelector("#product-modal-badge");
  const productModalTitle = document.querySelector("#product-modal-title");
  const productModalDescription = document.querySelector("#product-modal-description");
  const productModalMeta = document.querySelector("#product-modal-meta");
  const productModalService = document.querySelector("#product-modal-service");
  const productModalWhatsApp = document.querySelector("#product-modal-whatsapp");
  const productModalFavorite = document.querySelector("#product-modal-favorite");
  const productModalShare = document.querySelector("#product-modal-share");
  const productModalFeedback = document.querySelector("#product-modal-feedback");
  const productModalRelated = document.querySelector("#product-modal-related");

  let currentWhatsAppMessage = business.footerWhatsappMessage;
  let activeCategoryFilter = "Todos";
  let catalogSearchTerm = "";
  let catalogSortOrder = "relevance";
  let activeBrandFilter = "all";
  let activeLensTypeFilter = "all";
  let favoritesOnly = false;
  let currentPage = 1;
  let currentModalProductId = null;
  let currentModalImages = [];
  let currentModalImageIndex = 0;
  let modalTouchStartX = null;
  let modalAutoRotateEnabled = true;
  let modalAutoRotateTimer = null;
  let modalIsZoomed = false;

  const loadFavorites = () => {
    try {
      const raw = window.localStorage.getItem(FAVORITES_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(parsed)) {
        return new Set();
      }
      return new Set(parsed.map(String));
    } catch (error) {
      return new Set();
    }
  };

  const favoriteIds = loadFavorites();

  const saveFavorites = () => {
    window.localStorage.setItem(FAVORITES_KEY, JSON.stringify([...favoriteIds]));
  };

  const syncBodyOverflow = () => {
    const hasModal = whatsappModal.classList.contains("is-open") || productModal.classList.contains("is-open");
    document.body.style.overflow = hasModal ? "hidden" : "";
  };

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  const observeRevealTargets = (elements) => {
    elements.forEach((element, index) => {
      element.style.transitionDelay = `${Math.min(index * 45, 220)}ms`;
      if (element.classList.contains("is-visible")) {
        return;
      }
      revealObserver.observe(element);
    });
  };

  const setText = (selector, value) => {
    const node = document.querySelector(selector);
    if (node) {
      node.textContent = value;
    }
  };

  const setLink = (selector, href) => {
    const node = document.querySelector(selector);
    if (node) {
      node.href = href;
    }
  };

  const normalizeSearchText = (text) =>
    String(text || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  const productHasMarker = (product, marker) => {
    const searchable = normalizeSearchText(`${product.category} ${(product.tags || []).join(" ")}`);
    return searchable.includes(normalizeSearchText(marker));
  };

  const getPaymentChipClass = (method) => {
    const normalized = normalizeSearchText(method);
    if (normalized.includes("visa")) return "pay-chip--visa";
    if (normalized.includes("master")) return "pay-chip--master";
    if (normalized.includes("oca")) return "pay-chip--oca";
    if (normalized.includes("anda")) return "pay-chip--anda";
    if (normalized.includes("debito") || normalized.includes("débito")) return "pay-chip--debit";
    if (normalized.includes("efectivo")) return "pay-chip--cash";
    return "pay-chip--debit";
  };

  const genericTags = new Set([
    "sol",
    "receta",
    "cristales",
    "lentes de contacto",
    "nuevos ingresos",
    "contacto",
    "confort",
    "square",
    "metal",
    "pantallas",
    "cuidado",
    "versatiles",
    "versátiles"
  ]);

  const inferLensType = (product) => {
    if (["Sol", "Receta", "Cristales", "Lentes de contacto"].includes(product.category)) {
      return product.category;
    }

    const text = normalizeSearchText(`${product.name} ${product.description} ${(product.tags || []).join(" ")}`);
    if (text.includes("contacto")) return "Lentes de contacto";
    if (text.includes("cristal")) return "Cristales";
    if (text.includes("receta")) return "Receta";
    if (text.includes("sol") || text.includes("solar")) return "Sol";
    return "Otros";
  };

  const inferBrand = (product) => {
    const fromTags = (product.tags || []).find((tag) => {
      const normalized = normalizeSearchText(tag);
      return !genericTags.has(normalized) && !/[a-z]*\d{2,}/i.test(tag);
    });

    if (fromTags) {
      return fromTags;
    }

    const tokens = String(product.name || "").split(" ");
    if (tokens.length >= 2 && tokens[0].toLowerCase() === "armani" && tokens[1].toLowerCase() === "exchange") {
      return "Armani Exchange";
    }

    return tokens[0] || "Sin marca";
  };

  const getModelCode = (product) => {
    const found = `${product.name} ${(product.tags || []).join(" ")}`.match(/[A-Z]{1,4}\d{2,5}[A-Z0-9-]*/);
    return found ? found[0] : "Consultar";
  };

  const enrichedProducts = products.map((product, index) => {
    const imageList = [];
    if (Array.isArray(product.images)) {
      imageList.push(...product.images);
    }
    if (product.image) {
      imageList.unshift(product.image);
    }

    const normalizedImages = [...new Set(imageList.filter(Boolean).map((item) => String(item).trim()))];
    const sortPriority = productHasMarker(product, "Más consultados")
      ? 3
      : productHasMarker(product, "Colección nueva") || productHasMarker(product, "Nuevos ingresos")
        ? 2
        : normalizedImages.some((image) => image.startsWith("http"))
          ? 1
          : 0;

    return {
      ...product,
      _id: String(index),
      _orderIndex: index,
      sortPriority,
      brand: inferBrand(product),
      lensType: inferLensType(product),
      modelCode: getModelCode(product),
      images: normalizedImages
    };
  });

  const availableBrands = [...new Set(enrichedProducts.map((item) => item.brand))].sort((a, b) => a.localeCompare(b, "es"));
  const availableLensTypes = [...new Set(enrichedProducts.map((item) => item.lensType))].sort((a, b) => a.localeCompare(b, "es"));

  const fillSelect = (selectNode, values, allLabel) => {
    selectNode.innerHTML = [`<option value="all">${allLabel}</option>`]
      .concat(values.map((value) => `<option value="${value}">${value}</option>`))
      .join("");
  };

  const renderCatalogHighlights = () => {
    const consultedCount = enrichedProducts.filter((product) => productHasMarker(product, "Más consultados")).length;
    const newCount = enrichedProducts.filter(
      (product) => productHasMarker(product, "Colección nueva") || productHasMarker(product, "Nuevos ingresos")
    ).length;
    const remoteImagesCount = enrichedProducts.filter((product) => product.images.some((image) => image.startsWith("http"))).length;

    catalogHighlights.innerHTML = [
      {
        title: `${consultedCount} destacados listos para consultar`,
        text: "El catálogo prioriza los modelos más pedidos y las líneas que más rotan por WhatsApp."
      },
      {
        title: `${newCount} ingresos y colección nueva`,
        text: "La selección arranca por novedades para que el cliente vea primero lo más fuerte del momento."
      },
      {
        title: `${remoteImagesCount} fichas con imagen real`,
        text: "Seguimos reforzando la vidriera digital con más referencias visuales públicas y mejor lectura comercial."
      }
    ]
      .map(
        (item) => `
          <article class="catalog-highlight-card">
            <strong>${item.title}</strong>
            <span>${item.text}</span>
          </article>
        `
      )
      .join("");
  };

  fillSelect(catalogBrandSelect, availableBrands, "Todas las marcas");
  fillSelect(catalogLensTypeSelect, availableLensTypes, "Todos los tipos");
  renderCatalogHighlights();

  document.title = business.name;
  document.querySelector("meta[name='description']").setAttribute("content", business.description);
  document.querySelectorAll(".js-brand-name").forEach((node) => {
    node.textContent = business.name;
  });

  setText("#hero-eyebrow", business.heroEyebrow);
  setText("#hero-title", business.heroTitle);
  setText("#hero-subtitle", business.heroSubtitle);
  setText("#hero-note", business.heroNote);
  setText("#stock-eyebrow", business.stockEyebrow);
  setText("#stock-title", business.stockTitle);
  setText("#stock-text", business.stockText);
  setText("#about-eyebrow", business.aboutEyebrow);
  setText("#about-title", business.aboutTitle);
  setText("#about-text", business.aboutText);
  setText("#provider-tag", business.providerTag);
  setText("#provider-title", business.providerTitle);
  setText("#provider-text", business.providerText);
  setText("#social-eyebrow", business.socialEyebrow);
  setText("#social-title", business.socialTitle);
  setText("#social-text", business.socialText);
  setText("#contact-eyebrow", business.contactEyebrow);
  setText("#contact-title", business.contactTitle);
  setText("#contact-text", business.contactText);
  setText("#contact-note", business.contactNote);
  setText("#payment-label", business.paymentLabel);
  setText("#payment-benefit-label", business.paymentBenefitLabel);
  setText("#payment-benefit-badge", business.paymentBenefitBadge);
  setText("#payment-benefit-text", business.paymentBenefitText);

  const heroButton = document.querySelector("#hero-button");
  heroButton.textContent = business.heroButtonLabel;
  heroButton.dataset.message = business.heroButtonMessage;

  const stockButton = document.querySelector("#stock-button");
  stockButton.textContent = business.stockButtonLabel;
  stockButton.dataset.message = business.stockButtonMessage;

  const contactButton = document.querySelector("#contact-button");
  contactButton.textContent = business.contactButtonLabel;
  contactButton.dataset.message = business.contactButtonMessage;

  const footerWhatsapp = document.querySelector("#footer-whatsapp");
  footerWhatsapp.textContent = business.footerWhatsappLabel;
  footerWhatsapp.dataset.message = business.footerWhatsappMessage;

  setLink("#instagram-link", links.instagram);
  setLink("#facebook-link", links.facebook);
  setLink("#footer-instagram", links.instagram);
  setLink("#footer-facebook", links.facebook);

  document.querySelector("#trust-strip-items").innerHTML = `
    <span>Categorías destacadas</span>
    ${trustItems.map((item) => `<span>${item}</span>`).join("")}
  `;

  paymentMethodsNode.innerHTML = (business.paymentMethods || [])
    .map((method) => `<span class="pay-chip ${getPaymentChipClass(method)}">${method}</span>`)
    .join("");

  stockStatsGrid.innerHTML = stockStats
    .map(
      (item) => `
        <article class="stock-stat-card">
          <strong>${item.value}</strong>
          <span>${item.label}</span>
        </article>
      `
    )
    .join("");

  categoriesGrid.innerHTML = categories
    .map(
      (category) => `
        <article class="category-card reveal">
          <span class="category-badge">${category.badge}</span>
          <h3>${category.title}</h3>
          <p>${category.text}</p>
        </article>
      `
    )
    .join("");

  promotionsGrid.innerHTML = promotions
    .map(
      (promotion) => `
        <article class="promo-card reveal">
          <img class="promo-card__image" src="${promotion.image}" alt="${promotion.title}" />
          <div class="promo-card__body">
            <span class="category-badge">${promotion.badge}</span>
            <h3>${promotion.title}</h3>
            <p>${promotion.text}</p>
            <a class="button js-open-whatsapp" href="#contacto" data-message="${promotion.message}">${promotion.buttonLabel}</a>
          </div>
        </article>
      `
    )
    .join("");

  catalogControls.innerHTML = catalogFilters
    .map(
      (filter, index) => `
        <button class="catalog-filter${index === 0 ? " is-active" : ""}" type="button" data-filter="${filter}">${filter}</button>
      `
    )
    .join("");

  const setModalFeedback = (text) => {
    productModalFeedback.textContent = text;
  };

  const updateModalFavoriteButton = (productId) => {
    const isFavorite = favoriteIds.has(productId);
    productModalFavorite.textContent = isFavorite ? "Quitar de favoritos" : "Guardar en favoritos";
    productModalFavorite.classList.toggle("is-active", isFavorite);
  };

  const updateHashForProduct = (productId) => {
    const newHash = `#producto-${productId}`;
    if (window.location.hash !== newHash) {
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}${newHash}`);
    }
  };

  const clearProductHash = () => {
    if (window.location.hash.startsWith("#producto-")) {
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    }
  };

  const renderRelatedProducts = (product) => {
    const related = enrichedProducts
      .filter((candidate) => candidate._id !== product._id && (candidate.lensType === product.lensType || candidate.brand === product.brand))
      .slice(0, 4);

    if (related.length === 0) {
      productModalRelated.innerHTML = '<p class="product-modal__empty">No hay relacionados por ahora.</p>';
      return;
    }

    productModalRelated.innerHTML = related
      .map(
        (item) => `
          <button class="related-card js-open-product" type="button" data-product-id="${item._id}">
            <img src="${item.images[0] || item.image}" alt="${item.name}" />
            <span>${item.name}</span>
          </button>
        `
      )
      .join("");
  };

  const stopModalAutoRotate = () => {
    if (modalAutoRotateTimer) {
      window.clearInterval(modalAutoRotateTimer);
      modalAutoRotateTimer = null;
    }
  };

  const setModalZoom = (enabled) => {
    modalIsZoomed = enabled;
    productModalMedia.classList.toggle("is-zoomed", enabled);
    productModalZoom.classList.toggle("is-active", enabled);
    productModalZoom.textContent = enabled ? "Quitar zoom" : "Zoom";
    if (enabled) {
      stopModalAutoRotate();
    }
  };

  const syncRotateButton = () => {
    productModalRotate.classList.toggle("is-active", modalAutoRotateEnabled);
    productModalRotate.textContent = modalAutoRotateEnabled ? "Pausar giro" : "Reanudar giro";
  };

  const startModalAutoRotate = () => {
    stopModalAutoRotate();

    if (!modalAutoRotateEnabled || currentModalImages.length <= 1 || modalIsZoomed) {
      return;
    }

    modalAutoRotateTimer = window.setInterval(() => {
      const nextIndex = currentModalImageIndex === currentModalImages.length - 1 ? 0 : currentModalImageIndex + 1;
      renderModalImageAt(nextIndex);
    }, 2200);
  };

  const renderModalImageAt = (index) => {
    if (!currentModalImages.length) {
      return;
    }

    currentModalImageIndex = Math.max(0, Math.min(index, currentModalImages.length - 1));
    const imageSrc = currentModalImages[currentModalImageIndex];
    productModalImage.src = imageSrc;
    productModalCounter.textContent = `${currentModalImageIndex + 1}/${currentModalImages.length}`;

    productModalThumbs.innerHTML = currentModalImages
      .map(
        (image, imageIndex) => `
          <button class="product-modal__thumb${imageIndex === currentModalImageIndex ? " is-active" : ""}" type="button" data-modal-image-index="${imageIndex}" aria-label="Ver imagen ${imageIndex + 1}">
            <img src="${image}" alt="Vista ${imageIndex + 1}" />
          </button>
        `
      )
      .join("");

    const hasMultipleImages = currentModalImages.length > 1;
    productModalPrevImage.style.display = hasMultipleImages ? "inline-flex" : "none";
    productModalNextImage.style.display = hasMultipleImages ? "inline-flex" : "none";
    productModalRotate.style.display = hasMultipleImages ? "inline-flex" : "none";
    productModalPrevImage.disabled = currentModalImageIndex === 0;
    productModalNextImage.disabled = currentModalImageIndex === currentModalImages.length - 1;
  };

  const renderProductModal = (product) => {
    currentModalImages = product.images.length ? product.images : [product.image];
    currentModalImageIndex = 0;
    modalAutoRotateEnabled = true;
    setModalZoom(false);
    syncRotateButton();
    renderModalImageAt(0);
    startModalAutoRotate();
    productModalImage.alt = product.name;
    productModalBadge.textContent = `${product.brand} · ${product.lensType}`;
    productModalTitle.textContent = product.name;
    productModalDescription.textContent = product.description;
    productModalMeta.innerHTML = [
      `<span class="product-tag">Código ${product.modelCode}</span>`,
      `<span class="product-tag">Marca ${product.brand}</span>`,
      `<span class="product-tag">Tipo ${product.lensType}</span>`
    ]
      .concat((product.tags || []).map((tag) => `<span class="product-tag">${tag}</span>`))
      .join("");

    const serviceSignals = [];
    if (String(product.image || "").startsWith("http")) {
      serviceSignals.push("Imagen referencial de línea cargada");
    }
    if (productHasMarker(product, "Más consultados")) {
      serviceSignals.push("Modelo de alta consulta en salón");
    }
    if (productHasMarker(product, "Colección nueva") || productHasMarker(product, "Nuevos ingresos")) {
      serviceSignals.push("Ingreso reciente para vidriera");
    }
    serviceSignals.push("Asesoramiento personalizado por WhatsApp");

    productModalService.innerHTML = `
      <strong>Señales comerciales</strong>
      <div class="product-modal__service-grid">
        ${serviceSignals.slice(0, 4).map((item) => `<span>${item}</span>`).join("")}
      </div>
    `;

    productModalWhatsApp.dataset.message = `Hola quiero consultar por ${product.name} (${product.modelCode})`;
    updateModalFavoriteButton(product._id);
    renderRelatedProducts(product);
    setModalFeedback("");
  };

  const openProductModal = (product, { setHash = true } = {}) => {
    currentModalProductId = product._id;
    renderProductModal(product);
    productModal.classList.add("is-open");
    productModal.setAttribute("aria-hidden", "false");
    if (setHash) {
      updateHashForProduct(product._id);
    }
    syncBodyOverflow();
  };

  const closeProductModal = ({ clearHash = true } = {}) => {
    currentModalProductId = null;
    stopModalAutoRotate();
    setModalZoom(false);
    productModal.classList.remove("is-open");
    productModal.setAttribute("aria-hidden", "true");
    if (clearHash) {
      clearProductHash();
    }
    syncBodyOverflow();
  };

  const toggleFavorite = (productId) => {
    if (favoriteIds.has(productId)) {
      favoriteIds.delete(productId);
    } else {
      favoriteIds.add(productId);
    }
    saveFavorites();
  };

  const getFilteredProducts = () => {
    const normalizedSearch = normalizeSearchText(catalogSearchTerm);

    const categoryFilterMatch = (product) => {
      if (activeCategoryFilter === "Todos") {
        return true;
      }

      if (activeCategoryFilter === "Colección nueva") {
        const searchable = normalizeSearchText(`${product.category} ${(product.tags || []).join(" ")}`);
        return searchable.includes("coleccion nueva") || searchable.includes("colección nueva") || searchable.includes("nuevos ingresos");
      }

      if (activeCategoryFilter === "Más consultados") {
        const searchable = normalizeSearchText(`${product.category} ${(product.tags || []).join(" ")}`);
        return searchable.includes("mas consultados") || searchable.includes("más consultados");
      }

      return product.category === activeCategoryFilter;
    };

    let filtered = enrichedProducts.filter((product) => {
      const categoryMatch = categoryFilterMatch(product);
      const brandMatch = activeBrandFilter === "all" || product.brand === activeBrandFilter;
      const lensTypeMatch = activeLensTypeFilter === "all" || product.lensType === activeLensTypeFilter;
      const favoriteMatch = !favoritesOnly || favoriteIds.has(product._id);

      if (!(categoryMatch && brandMatch && lensTypeMatch && favoriteMatch)) {
        return false;
      }

      if (!normalizedSearch) {
        return true;
      }

      const searchable = normalizeSearchText(
        `${product.name} ${product.description} ${product.brand} ${product.lensType} ${product.modelCode} ${(product.tags || []).join(" ")}`
      );

      return searchable.includes(normalizedSearch);
    });

    if (catalogSortOrder === "az") {
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name, "es"));
    } else if (catalogSortOrder === "za") {
      filtered = [...filtered].sort((a, b) => b.name.localeCompare(a.name, "es"));
    } else {
      filtered = [...filtered].sort((a, b) => b.sortPriority - a.sortPriority || a._orderIndex - b._orderIndex);
    }

    return filtered;
  };

  const renderCatalogPagination = (totalItems) => {
    const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
    currentPage = Math.min(currentPage, totalPages);

    if (totalItems === 0) {
      catalogPagination.innerHTML = "";
      return;
    }

    const pages = Array.from({ length: totalPages }, (_, index) => index + 1)
      .map(
        (page) =>
          `<button type="button" class="catalog-page${page === currentPage ? " is-active" : ""}" data-page="${page}">${page}</button>`
      )
      .join("");

    catalogPagination.innerHTML = `
      <button type="button" class="catalog-page-nav" data-page-nav="prev" ${currentPage === 1 ? "disabled" : ""}>Anterior</button>
      <div class="catalog-page-list">${pages}</div>
      <button type="button" class="catalog-page-nav" data-page-nav="next" ${currentPage === totalPages ? "disabled" : ""}>Siguiente</button>
    `;
  };

  const renderCatalogProducts = () => {
    const filteredProducts = getFilteredProducts();
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const visibleItems = filteredProducts.slice(start, start + ITEMS_PER_PAGE);

    productGrid.innerHTML = visibleItems
      .map(
        (product) => {
          const isFavorite = favoriteIds.has(product._id);
          const highlightLabel = productHasMarker(product, "Más consultados")
            ? "Más consultado"
            : productHasMarker(product, "Colección nueva") || productHasMarker(product, "Nuevos ingresos")
              ? "Nuevo"
              : product.lensType;
          return `
            <article class="product-card reveal" data-category="${product.category}">
              <div class="product-media">
                <span class="product-badge${productHasMarker(product, "Más consultados") ? " product-badge--accent" : ""}">${highlightLabel}</span>
                <img class="product-image" src="${product.images[0] || product.image}" alt="${product.name}" />
              </div>
              <div class="product-body">
                <span class="product-brandline">${product.brand} · ${product.modelCode}</span>
                <h3>${product.name}</h3>
                <p class="product-consult">Consultanos disponibilidad y asesoramiento por WhatsApp.</p>
                <p class="product-description">${product.description}</p>
                <div class="product-meta">
                  <span class="product-tag">${product.brand}</span>
                  <span class="product-tag">${product.lensType}</span>
                  <span class="product-tag">${product.modelCode}</span>
                </div>
                <div class="product-actions product-actions--double">
                  <button class="button button-outline-dark js-open-product" type="button" data-product-id="${product._id}">Ver ficha</button>
                  <button class="button button-outline-dark js-toggle-favorite ${isFavorite ? "is-active" : ""}" type="button" data-product-id="${product._id}">
                    ${isFavorite ? "Quitar favorito" : "Guardar favorito"}
                  </button>
                  <a class="button js-open-whatsapp" href="#contacto" data-message="Hola quiero consultar por ${product.name} (${product.modelCode})">Consultar por WhatsApp</a>
                </div>
              </div>
            </article>
          `;
        }
      )
      .join("");

    const count = filteredProducts.length;
    if (favoritesOnly && count === 0) {
      catalogResults.textContent = "Todavía no tenés favoritos guardados.";
    } else {
      catalogResults.textContent = count === 0 ? "No encontramos modelos con ese filtro." : `${count} modelos para consultar. El orden actual prioriza destacados, novedades y fichas con mejor vidriera visual.`;
    }

    renderCatalogPagination(count);
    observeRevealTargets(productGrid.querySelectorAll(".reveal"));
  };

  const refreshCatalog = ({ keepPage } = { keepPage: false }) => {
    if (!keepPage) {
      currentPage = 1;
    }
    renderCatalogProducts();
  };

  const findProductById = (id) => enrichedProducts.find((item) => item._id === String(id));

  const findPageForProduct = (productId) => {
    const filteredProducts = getFilteredProducts();
    const index = filteredProducts.findIndex((item) => item._id === String(productId));
    if (index === -1) {
      return 1;
    }
    return Math.floor(index / ITEMS_PER_PAGE) + 1;
  };

  const openProductFromHash = () => {
    if (!window.location.hash.startsWith("#producto-")) {
      closeProductModal({ clearHash: false });
      return;
    }

    const productId = window.location.hash.replace("#producto-", "");
    const product = findProductById(productId);

    if (!product) {
      closeProductModal({ clearHash: true });
      return;
    }

    currentPage = findPageForProduct(product._id);
    renderCatalogProducts();
    catalogSection.scrollIntoView({ behavior: "smooth", block: "start" });
    openProductModal(product, { setHash: false });
  };

  productModalPrevImage.addEventListener("click", () => {
    renderModalImageAt(currentModalImageIndex - 1);
  });

  productModalNextImage.addEventListener("click", () => {
    renderModalImageAt(currentModalImageIndex + 1);
  });

  productModalThumbs.addEventListener("click", (event) => {
    const thumb = event.target.closest("[data-modal-image-index]");
    if (!thumb) {
      return;
    }
    renderModalImageAt(Number(thumb.dataset.modalImageIndex));
  });

  productModalZoom.addEventListener("click", () => {
    const nextZoomState = !modalIsZoomed;
    setModalZoom(nextZoomState);
    if (!nextZoomState) {
      startModalAutoRotate();
    }
  });

  productModalRotate.addEventListener("click", () => {
    modalAutoRotateEnabled = !modalAutoRotateEnabled;
    syncRotateButton();
    if (modalAutoRotateEnabled) {
      startModalAutoRotate();
    } else {
      stopModalAutoRotate();
    }
  });

  productModalImage.addEventListener("click", (event) => {
    const rect = productModalImage.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    productModalImage.style.transformOrigin = `${x}% ${y}%`;
    const nextZoomState = !modalIsZoomed;
    setModalZoom(nextZoomState);
    if (!nextZoomState) {
      startModalAutoRotate();
    }
  });

  productModalImage.addEventListener("touchstart", (event) => {
    modalTouchStartX = event.changedTouches[0].clientX;
  });

  productModalImage.addEventListener("touchend", (event) => {
    if (modalTouchStartX === null) {
      return;
    }

    const delta = event.changedTouches[0].clientX - modalTouchStartX;
    modalTouchStartX = null;

    if (Math.abs(delta) < 35) {
      return;
    }

    if (delta < 0) {
      renderModalImageAt(currentModalImageIndex + 1);
    } else {
      renderModalImageAt(currentModalImageIndex - 1);
    }
  });

  branchesGrid.innerHTML = branches
    .map(
      (branch) => `
        <article class="branch-card reveal">
          <img src="${branch.image}" alt="Sucursal ${branch.city} de ${business.name}" />
          <div class="branch-card__header">
            <div>
              <span class="branch-card__badge">Sucursal ${branch.city}</span>
              <h3>${branch.city}</h3>
            </div>
            <span class="product-tag">${branch.hours}</span>
          </div>
          <p>${branch.copy}</p>
          <div class="branch-card__meta">
            <span><strong>Dirección:</strong> ${branch.address}</span>
            <span><strong>WhatsApp:</strong> ${branch.localNumber}</span>
            <span><strong>Horario:</strong> ${branch.hours}</span>
          </div>
          <div class="branch-promo">
            <strong>${branch.promoTitle}</strong>
            <span>${branch.promoText}</span>
          </div>
          <div class="branch-card__actions">
            <a class="button button-primary" href="${buildWhatsAppUrl(branch.number, buildBranchMessage("Hola quiero consultar por productos ópticos", branch.city))}" target="_blank" rel="noreferrer noopener">Escribir a ${branch.city}</a>
            <a class="button button-outline-dark" href="${branch.mapUrl}" target="_blank" rel="noreferrer noopener">Ver mapa</a>
          </div>
        </article>
      `
    )
    .join("");

  benefitsGrid.innerHTML = benefits
    .map(
      (benefit) => `
        <article class="benefit-card reveal">
          <h3>${benefit}</h3>
          <p>Una propuesta clara para transmitir confianza, elevar el valor percibido y facilitar la decisión de compra.</p>
        </article>
      `
    )
    .join("");

  testimonialsGrid.innerHTML = testimonials
    .map(
      (testimonial) => `
        <article class="testimonial-card reveal">
          <span class="stars" aria-hidden="true">★★★★★</span>
          <p>“${testimonial.review}”</p>
          <strong>${testimonial.name}</strong>
        </article>
      `
    )
    .join("");

  instagramGrid.innerHTML = socialHighlights
    .map(
      (item) => `
        <article class="instagram-card reveal">
          <img src="${item.image}" alt="${item.title}" />
          <div class="instagram-card__header">
            <strong>${item.title}</strong>
            <span class="instagram-card__badge">${item.badge}</span>
          </div>
          <p>${item.text}</p>
        </article>
      `
    )
    .join("");

  contactBranches.innerHTML = branches
    .map(
      (branch) => `
        <a class="branch-item" href="${buildWhatsAppUrl(branch.number, buildBranchMessage("Hola quiero información sobre productos ópticos", branch.city))}" target="_blank" rel="noreferrer noopener">
          <span class="branch-meta">
            <strong>${branch.city}</strong>
            <span>${branch.localNumber}</span>
            <span class="branch-address">${branch.address}</span>
          </span>
          <span class="branch-cta-label">Consultar</span>
        </a>
      `
    )
    .join("");

  document.querySelector("#contact-hours").textContent = [...new Set(branches.map((branch) => branch.hours))].join(" / ");
  document.querySelector("#contact-addresses").textContent = branches.map((branch) => `${branch.city} ${branch.address}`).join(" y ");

  const renderBranchOptions = (message) => {
    messagePreview.textContent = message;
    branchOptions.innerHTML = branches
      .map(
        (branch) => `
          <a class="branch-option" href="${buildWhatsAppUrl(branch.number, buildBranchMessage(message, branch.city))}" target="_blank" rel="noreferrer noopener">
            <span class="branch-meta">
              <strong>${branch.city}</strong>
              <span>${branch.localNumber}</span>
              <span class="branch-address">${branch.address}</span>
            </span>
          </a>
        `
      )
      .join("");
  };

  const openWhatsAppModal = (message) => {
    currentWhatsAppMessage = message;
    renderBranchOptions(currentWhatsAppMessage);
    whatsappModal.classList.add("is-open");
    whatsappModal.setAttribute("aria-hidden", "false");
    syncBodyOverflow();
  };

  const closeWhatsAppModal = () => {
    whatsappModal.classList.remove("is-open");
    whatsappModal.setAttribute("aria-hidden", "true");
    syncBodyOverflow();
  };

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest(".js-open-whatsapp");
    const filter = event.target.closest(".catalog-filter");
    const pageButton = event.target.closest("[data-page]");
    const pageNavButton = event.target.closest("[data-page-nav]");
    const productTrigger = event.target.closest(".js-open-product");
    const favoriteTrigger = event.target.closest(".js-toggle-favorite");

    if (filter) {
      activeCategoryFilter = filter.dataset.filter;

      document.querySelectorAll(".catalog-filter").forEach((button) => {
        button.classList.toggle("is-active", button === filter);
      });

      refreshCatalog();
      return;
    }

    if (pageButton) {
      currentPage = Number(pageButton.dataset.page);
      renderCatalogProducts();
      return;
    }

    if (pageNavButton) {
      if (pageNavButton.dataset.pageNav === "prev") {
        currentPage = Math.max(1, currentPage - 1);
      }
      if (pageNavButton.dataset.pageNav === "next") {
        currentPage += 1;
      }
      renderCatalogProducts();
      return;
    }

    if (favoriteTrigger) {
      const productId = favoriteTrigger.dataset.productId;
      toggleFavorite(productId);
      if (currentModalProductId === productId) {
        updateModalFavoriteButton(productId);
      }
      renderCatalogProducts();
      return;
    }

    if (productTrigger) {
      const selectedProduct = findProductById(productTrigger.dataset.productId);
      if (selectedProduct) {
        openProductModal(selectedProduct);
      }
      return;
    }

    if (trigger) {
      event.preventDefault();
      openWhatsAppModal(trigger.dataset.message || currentWhatsAppMessage);
      return;
    }

    if (event.target.closest("[data-close-whatsapp='true']")) {
      closeWhatsAppModal();
    }

    if (event.target.closest("[data-close-product-modal='true']")) {
      closeProductModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && whatsappModal.classList.contains("is-open")) {
      closeWhatsAppModal();
    }

    if (event.key === "Escape" && productModal.classList.contains("is-open")) {
      closeProductModal();
    }

    if (productModal.classList.contains("is-open") && event.key === "ArrowLeft") {
      renderModalImageAt(currentModalImageIndex - 1);
    }

    if (productModal.classList.contains("is-open") && event.key === "ArrowRight") {
      renderModalImageAt(currentModalImageIndex + 1);
    }
  });

  window.addEventListener("hashchange", () => {
    openProductFromHash();
  });

  catalogSearchInput.addEventListener("input", (event) => {
    catalogSearchTerm = event.target.value.trim();
    refreshCatalog();
  });

  catalogSortSelect.addEventListener("change", (event) => {
    catalogSortOrder = event.target.value;
    refreshCatalog({ keepPage: true });
  });

  catalogBrandSelect.addEventListener("change", (event) => {
    activeBrandFilter = event.target.value;
    refreshCatalog();
  });

  catalogLensTypeSelect.addEventListener("change", (event) => {
    activeLensTypeFilter = event.target.value;
    refreshCatalog();
  });

  catalogFavoritesOnly.addEventListener("change", (event) => {
    favoritesOnly = event.target.checked;
    refreshCatalog();
  });

  productModalFavorite.addEventListener("click", () => {
    if (!currentModalProductId) {
      return;
    }

    toggleFavorite(currentModalProductId);
    updateModalFavoriteButton(currentModalProductId);
    setModalFeedback(favoriteIds.has(currentModalProductId) ? "Producto agregado a favoritos." : "Producto quitado de favoritos.");
    renderCatalogProducts();
  });

  productModalShare.addEventListener("click", async () => {
    if (!currentModalProductId) {
      return;
    }

    const shareUrl = `${window.location.origin}${window.location.pathname}${window.location.search}#producto-${currentModalProductId}`;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setModalFeedback("Link copiado al portapapeles.");
    } catch (error) {
      setModalFeedback("No se pudo copiar automáticamente. Copiá este link: " + shareUrl);
    }
  });

  refreshCatalog();
  observeRevealTargets(document.querySelectorAll(".reveal"));
  openProductFromHash();
};

initializeSite();
