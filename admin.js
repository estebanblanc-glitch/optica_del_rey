const dataStore = window.SiteDataStore;
let state = dataStore.clone(dataStore.defaults);

const statusNode = document.querySelector("#admin-status");
const authLayer = document.querySelector("#admin-auth");
const authForm = document.querySelector("#admin-auth-form");
const authInput = document.querySelector("#admin-password-input");
const authHint = document.querySelector("#admin-auth-hint");
const previewFrame = document.querySelector("#preview-frame");
const previewStatus = document.querySelector("#preview-status");
const refreshPreviewButton = document.querySelector("#refresh-preview");
const stockStatsEditor = document.querySelector("#stock-stats-editor");
const promotionsEditor = document.querySelector("#promotions-editor");
const branchesEditor = document.querySelector("#branches-editor");
const productsEditor = document.querySelector("#products-editor");
const categoriesEditor = document.querySelector("#categories-editor");
const benefitsEditor = document.querySelector("#benefits-editor");
const testimonialsEditor = document.querySelector("#testimonials-editor");
const highlightsEditor = document.querySelector("#highlights-editor");

let previewTimer = null;

const escapeHtml = (value) =>
  String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const setStatus = (message) => {
  statusNode.textContent = message;
};

const refreshPreview = () => {
  if (!previewFrame) {
    return;
  }

  previewFrame.src = `index.html?preview=${Date.now()}`;
  if (previewStatus) {
    previewStatus.textContent = "Vista previa actualizada con tu borrador local.";
  }
};

const syncPreviewDraft = () => {
  rebuildStateFromForm();
  state = dataStore.save(state);
  refreshPreview();
};

const schedulePreviewSync = () => {
  if (previewStatus) {
    previewStatus.textContent = "Actualizando vista previa...";
  }

  window.clearTimeout(previewTimer);
  previewTimer = window.setTimeout(() => {
    syncPreviewDraft();
  }, 350);
};

const unlockAdmin = async () => {
  state = await dataStore.load();
  renderAll();
  refreshPreview();
  authLayer.classList.add("is-hidden");
  document.body.classList.remove("admin-locked");
};

const renderGeneralFields = () => {
  document.querySelector("#business-name").value = state.business.name;
  document.querySelector("#business-description").value = state.business.description;
  document.querySelector("#hero-eyebrow").value = state.business.heroEyebrow;
  document.querySelector("#hero-title").value = state.business.heroTitle;
  document.querySelector("#hero-subtitle").value = state.business.heroSubtitle;
  document.querySelector("#hero-note").value = state.business.heroNote;
  document.querySelector("#stock-eyebrow").value = state.business.stockEyebrow;
  document.querySelector("#about-eyebrow").value = state.business.aboutEyebrow;
  document.querySelector("#about-title").value = state.business.aboutTitle;
  document.querySelector("#about-text").value = state.business.aboutText;
  document.querySelector("#provider-tag").value = state.business.providerTag;
  document.querySelector("#provider-title").value = state.business.providerTitle;
  document.querySelector("#provider-text").value = state.business.providerText;
  document.querySelector("#social-eyebrow").value = state.business.socialEyebrow;
  document.querySelector("#contact-text").value = state.business.contactText;
  document.querySelector("#contact-eyebrow").value = state.business.contactEyebrow;
  document.querySelector("#contact-title").value = state.business.contactTitle;
  document.querySelector("#contact-note").value = state.business.contactNote;
  document.querySelector("#payment-label").value = state.business.paymentLabel;
  document.querySelector("#payment-benefit-label").value = state.business.paymentBenefitLabel;
  document.querySelector("#payment-benefit-badge").value = state.business.paymentBenefitBadge;
  document.querySelector("#payment-benefit-text").value = state.business.paymentBenefitText;
  document.querySelector("#payment-methods").value = (state.business.paymentMethods || []).join(", ");
  document.querySelector("#social-title").value = state.business.socialTitle;
  document.querySelector("#social-text").value = state.business.socialText;
  document.querySelector("#link-instagram").value = state.links.instagram;
  document.querySelector("#link-facebook").value = state.links.facebook;
  document.querySelector("#hero-button-label").value = state.business.heroButtonLabel;
  document.querySelector("#hero-button-message").value = state.business.heroButtonMessage;
  document.querySelector("#stock-button-label").value = state.business.stockButtonLabel;
  document.querySelector("#stock-button-message").value = state.business.stockButtonMessage;
  document.querySelector("#contact-button-label").value = state.business.contactButtonLabel;
  document.querySelector("#contact-button-message").value = state.business.contactButtonMessage;
  document.querySelector("#footer-whatsapp-label").value = state.business.footerWhatsappLabel;
  document.querySelector("#footer-whatsapp-message").value = state.business.footerWhatsappMessage;
  document.querySelector("#stock-title").value = state.business.stockTitle;
  document.querySelector("#stock-text").value = state.business.stockText;
  document.querySelector("#trust-items").value = state.trustItems.join(", ");
  document.querySelector("#catalog-filters").value = state.catalogFilters.join(", ");
};

const renderStockStats = () => {
  stockStatsEditor.innerHTML = state.stockStats
    .map(
      (item, index) => `
        <article class="admin-card" data-index="${index}">
          <div class="admin-card__top">
            <strong>Estadística ${index + 1}</strong>
            <button class="admin-remove" type="button" data-remove="stock-stat" data-index="${index}">Eliminar</button>
          </div>
          <div class="admin-grid admin-grid-2">
            <label>
              Valor
              <input data-stock-stat="value" data-index="${index}" type="text" value="${escapeHtml(item.value)}" />
            </label>
            <label>
              Texto
              <input data-stock-stat="label" data-index="${index}" type="text" value="${escapeHtml(item.label)}" />
            </label>
          </div>
        </article>
      `
    )
    .join("");
};

const renderCategories = () => {
  categoriesEditor.innerHTML = state.categories
    .map(
      (item, index) => `
        <article class="admin-card">
          <div class="admin-card__top">
            <strong>Categoría ${index + 1}</strong>
            <button class="admin-remove" type="button" data-remove="category" data-index="${index}">Eliminar</button>
          </div>
          <div class="admin-grid admin-grid-2">
            <label>
              Título
              <input data-category="title" data-index="${index}" type="text" value="${escapeHtml(item.title)}" />
            </label>
            <label>
              Badge
              <input data-category="badge" data-index="${index}" type="text" value="${escapeHtml(item.badge)}" />
            </label>
            <label class="admin-grid-span-2">
              Texto
              <textarea data-category="text" data-index="${index}" rows="3">${escapeHtml(item.text)}</textarea>
            </label>
          </div>
        </article>
      `
    )
    .join("");
};

const renderBenefits = () => {
  benefitsEditor.innerHTML = state.benefits
    .map(
      (item, index) => `
        <article class="admin-card">
          <div class="admin-card__top">
            <strong>Beneficio ${index + 1}</strong>
            <button class="admin-remove" type="button" data-remove="benefit" data-index="${index}">Eliminar</button>
          </div>
          <label>
            Texto
            <input data-benefit="text" data-index="${index}" type="text" value="${escapeHtml(item)}" />
          </label>
        </article>
      `
    )
    .join("");
};

const renderTestimonials = () => {
  testimonialsEditor.innerHTML = state.testimonials
    .map(
      (item, index) => `
        <article class="admin-card">
          <div class="admin-card__top">
            <strong>Testimonio ${index + 1}</strong>
            <button class="admin-remove" type="button" data-remove="testimonial" data-index="${index}">Eliminar</button>
          </div>
          <div class="admin-card__quote-preview">“${escapeHtml(item.review || "Nueva reseña")}"</div>
          <div class="admin-grid admin-grid-2">
            <label>
              Nombre
              <input data-testimonial="name" data-index="${index}" type="text" value="${escapeHtml(item.name)}" />
            </label>
            <label class="admin-grid-span-2">
              Reseña
              <textarea data-testimonial="review" data-index="${index}" rows="3">${escapeHtml(item.review)}</textarea>
            </label>
          </div>
        </article>
      `
    )
    .join("");
};

const renderHighlights = () => {
  highlightsEditor.innerHTML = state.socialHighlights
    .map(
      (item, index) => `
        <article class="admin-card">
          <div class="admin-card__top">
            <strong>Tarjeta ${index + 1}</strong>
            <button class="admin-remove" type="button" data-remove="highlight" data-index="${index}">Eliminar</button>
          </div>
          <div class="admin-grid admin-grid-2">
            <label>
              Título
              <input data-highlight="title" data-index="${index}" type="text" value="${escapeHtml(item.title)}" />
            </label>
            <label>
              Badge
              <input data-highlight="badge" data-index="${index}" type="text" value="${escapeHtml(item.badge)}" />
            </label>
            <label>
              Imagen
              <input data-highlight="image" data-index="${index}" type="text" value="${escapeHtml(item.image)}" />
            </label>
            <label class="admin-grid-span-2">
              Texto
              <textarea data-highlight="text" data-index="${index}" rows="3">${escapeHtml(item.text)}</textarea>
            </label>
          </div>
        </article>
      `
    )
    .join("");
};

const renderBranches = () => {
  branchesEditor.innerHTML = state.branches
    .map(
      (branch, index) => `
        <article class="admin-card">
          <div class="admin-card__top">
            <strong>${escapeHtml(branch.city || `Sucursal ${index + 1}`)}</strong>
            <button class="admin-remove" type="button" data-remove="branch" data-index="${index}">Eliminar</button>
          </div>
          <div class="admin-grid admin-grid-2">
            <label>
              Ciudad
              <input data-branch="city" data-index="${index}" type="text" value="${escapeHtml(branch.city)}" />
            </label>
            <label>
              WhatsApp internacional
              <input data-branch="number" data-index="${index}" type="text" value="${escapeHtml(branch.number)}" />
            </label>
            <label>
              WhatsApp visible
              <input data-branch="localNumber" data-index="${index}" type="text" value="${escapeHtml(branch.localNumber)}" />
            </label>
            <label>
              Horario
              <input data-branch="hours" data-index="${index}" type="text" value="${escapeHtml(branch.hours)}" />
            </label>
            <label class="admin-grid-span-2">
              Dirección
              <input data-branch="address" data-index="${index}" type="text" value="${escapeHtml(branch.address)}" />
            </label>
            <label class="admin-grid-span-2">
              Imagen
              <input data-branch="image" data-index="${index}" type="text" value="${escapeHtml(branch.image)}" />
            </label>
            <label class="admin-grid-span-2">
              Texto sucursal
              <textarea data-branch="copy" data-index="${index}" rows="3">${escapeHtml(branch.copy)}</textarea>
            </label>
            <label class="admin-grid-span-2">
              URL mapa
              <input data-branch="mapUrl" data-index="${index}" type="url" value="${escapeHtml(branch.mapUrl)}" />
            </label>
            <label>
              Título promo
              <input data-branch="promoTitle" data-index="${index}" type="text" value="${escapeHtml(branch.promoTitle)}" />
            </label>
            <label>
              Texto promo
              <input data-branch="promoText" data-index="${index}" type="text" value="${escapeHtml(branch.promoText)}" />
            </label>
          </div>
        </article>
      `
    )
    .join("");
};

const renderPromotions = () => {
  promotionsEditor.innerHTML = state.promotions
    .map(
      (promotion, index) => `
        <article class="admin-card">
          <div class="admin-card__top">
            <strong>${escapeHtml(promotion.title || `Promoción ${index + 1}`)}</strong>
            <button class="admin-remove" type="button" data-remove="promotion" data-index="${index}">Eliminar</button>
          </div>
          <div class="admin-card__media-row">
            <img class="admin-card__thumb" src="${escapeHtml(promotion.image)}" alt="${escapeHtml(promotion.title || `Promoción ${index + 1}`)}" />
            <div class="admin-card__summary">
              <span class="admin-card__badge">${escapeHtml(promotion.badge || "Promo")}</span>
              <p>${escapeHtml(promotion.text || "Texto editable")}</p>
            </div>
          </div>
          <div class="admin-grid admin-grid-2">
            <label>
              Título
              <input data-promotion="title" data-index="${index}" type="text" value="${escapeHtml(promotion.title)}" />
            </label>
            <label>
              Badge
              <input data-promotion="badge" data-index="${index}" type="text" value="${escapeHtml(promotion.badge)}" />
            </label>
            <label>
              Imagen
              <input data-promotion="image" data-index="${index}" type="text" value="${escapeHtml(promotion.image)}" />
            </label>
            <label>
              Texto botón
              <input data-promotion="buttonLabel" data-index="${index}" type="text" value="${escapeHtml(promotion.buttonLabel)}" />
            </label>
            <label class="admin-grid-span-2">
              Texto
              <textarea data-promotion="text" data-index="${index}" rows="3">${escapeHtml(promotion.text)}</textarea>
            </label>
            <label class="admin-grid-span-2">
              Mensaje WhatsApp
              <input data-promotion="message" data-index="${index}" type="text" value="${escapeHtml(promotion.message)}" />
            </label>
          </div>
        </article>
      `
    )
    .join("");
};

const renderProducts = () => {
  const selectableCategories = state.catalogFilters.filter(
    (item) => !["Todos", "Colección nueva", "Más consultados"].includes(item)
  );

  productsEditor.innerHTML = state.products
    .map(
      (product, index) => `
        <article class="admin-card">
          <div class="admin-card__top">
            <div class="admin-card__title-group">
              <strong>${escapeHtml(product.name || `Producto ${index + 1}`)}</strong>
              <span class="admin-card__position">Posición ${index + 1}</span>
            </div>
            <div class="admin-card__actions-row">
              <button class="admin-shift" type="button" data-move="product" data-direction="-1" data-index="${index}"${index === 0 ? " disabled" : ""}>Subir</button>
              <button class="admin-shift" type="button" data-move="product" data-direction="1" data-index="${index}"${index === state.products.length - 1 ? " disabled" : ""}>Bajar</button>
              <button class="admin-remove" type="button" data-remove="product" data-index="${index}">Eliminar</button>
            </div>
          </div>
          <div class="admin-grid admin-grid-2">
            <label>
              Nombre
              <input data-product="name" data-index="${index}" type="text" value="${escapeHtml(product.name)}" />
            </label>
            <label>
              Categoría
              <select data-product="category" data-index="${index}">
                ${selectableCategories
                  .map(
                    (option) =>
                      `<option value="${escapeHtml(option)}"${option === product.category ? " selected" : ""}>${escapeHtml(option)}</option>`
                  )
                  .join("")}
              </select>
            </label>
            <label>
              Imagen
              <input data-product="image" data-index="${index}" type="text" value="${escapeHtml(product.image)}" />
            </label>
            <label class="admin-grid-span-2">
              Imágenes extra separadas por coma
              <input data-product="images" data-index="${index}" type="text" value="${escapeHtml((product.images || []).join(", "))}" />
            </label>
            <label class="admin-grid-span-2">
              Descripción
              <textarea data-product="description" data-index="${index}" rows="3">${escapeHtml(product.description)}</textarea>
            </label>
            <label class="admin-grid-span-2">
              Tags separados por coma
              <input data-product="tags" data-index="${index}" type="text" value="${escapeHtml(product.tags.join(", "))}" />
            </label>
          </div>
        </article>
      `
    )
    .join("");
};

const renderAll = () => {
  renderGeneralFields();
  renderStockStats();
  renderCategories();
  renderPromotions();
  renderBenefits();
  renderTestimonials();
  renderHighlights();
  renderBranches();
  renderProducts();
};

const collectBySelector = (selector, mapper) =>
  Array.from(document.querySelectorAll(selector)).map((element) => mapper(element));

const rebuildStateFromForm = () => {
  state.business.name = document.querySelector("#business-name").value.trim();
  state.business.description = document.querySelector("#business-description").value.trim();
  state.business.heroEyebrow = document.querySelector("#hero-eyebrow").value.trim();
  state.business.heroTitle = document.querySelector("#hero-title").value.trim();
  state.business.heroSubtitle = document.querySelector("#hero-subtitle").value.trim();
  state.business.heroNote = document.querySelector("#hero-note").value.trim();
  state.business.stockEyebrow = document.querySelector("#stock-eyebrow").value.trim();
  state.business.aboutEyebrow = document.querySelector("#about-eyebrow").value.trim();
  state.business.aboutTitle = document.querySelector("#about-title").value.trim();
  state.business.aboutText = document.querySelector("#about-text").value.trim();
  state.business.providerTag = document.querySelector("#provider-tag").value.trim();
  state.business.providerTitle = document.querySelector("#provider-title").value.trim();
  state.business.providerText = document.querySelector("#provider-text").value.trim();
  state.business.socialEyebrow = document.querySelector("#social-eyebrow").value.trim();
  state.business.contactText = document.querySelector("#contact-text").value.trim();
  state.business.contactEyebrow = document.querySelector("#contact-eyebrow").value.trim();
  state.business.contactTitle = document.querySelector("#contact-title").value.trim();
  state.business.contactNote = document.querySelector("#contact-note").value.trim();
  state.business.paymentLabel = document.querySelector("#payment-label").value.trim();
  state.business.paymentBenefitLabel = document.querySelector("#payment-benefit-label").value.trim();
  state.business.paymentBenefitBadge = document.querySelector("#payment-benefit-badge").value.trim();
  state.business.paymentBenefitText = document.querySelector("#payment-benefit-text").value.trim();
  state.business.paymentMethods = document.querySelector("#payment-methods").value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  state.business.socialTitle = document.querySelector("#social-title").value.trim();
  state.business.socialText = document.querySelector("#social-text").value.trim();
  state.links.instagram = document.querySelector("#link-instagram").value.trim();
  state.links.facebook = document.querySelector("#link-facebook").value.trim();
  state.business.heroButtonLabel = document.querySelector("#hero-button-label").value.trim();
  state.business.heroButtonMessage = document.querySelector("#hero-button-message").value.trim();
  state.business.stockButtonLabel = document.querySelector("#stock-button-label").value.trim();
  state.business.stockButtonMessage = document.querySelector("#stock-button-message").value.trim();
  state.business.contactButtonLabel = document.querySelector("#contact-button-label").value.trim();
  state.business.contactButtonMessage = document.querySelector("#contact-button-message").value.trim();
  state.business.footerWhatsappLabel = document.querySelector("#footer-whatsapp-label").value.trim();
  state.business.footerWhatsappMessage = document.querySelector("#footer-whatsapp-message").value.trim();
  state.business.stockTitle = document.querySelector("#stock-title").value.trim();
  state.business.stockText = document.querySelector("#stock-text").value.trim();
  state.trustItems = document.querySelector("#trust-items").value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  state.catalogFilters = document.querySelector("#catalog-filters").value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  state.stockStats = collectBySelector("[data-stock-stat='value']", (element) => {
    const index = Number(element.dataset.index);
    return {
      value: element.value.trim(),
      label: document.querySelector(`[data-stock-stat='label'][data-index='${index}']`).value.trim()
    };
  });

  state.categories = collectBySelector("[data-category='title']", (element) => {
    const index = Number(element.dataset.index);
    return {
      title: element.value.trim(),
      badge: document.querySelector(`[data-category='badge'][data-index='${index}']`).value.trim(),
      text: document.querySelector(`[data-category='text'][data-index='${index}']`).value.trim()
    };
  });

  state.promotions = collectBySelector("[data-promotion='title']", (element) => {
    const index = Number(element.dataset.index);
    const getValue = (field) => document.querySelector(`[data-promotion='${field}'][data-index='${index}']`).value.trim();
    return {
      title: element.value.trim(),
      badge: getValue("badge"),
      image: getValue("image"),
      buttonLabel: getValue("buttonLabel"),
      text: getValue("text"),
      message: getValue("message")
    };
  });

  state.benefits = collectBySelector("[data-benefit='text']", (element) => element.value.trim());

  state.testimonials = collectBySelector("[data-testimonial='name']", (element) => {
    const index = Number(element.dataset.index);
    return {
      name: element.value.trim(),
      review: document.querySelector(`[data-testimonial='review'][data-index='${index}']`).value.trim()
    };
  });

  state.socialHighlights = collectBySelector("[data-highlight='title']", (element) => {
    const index = Number(element.dataset.index);
    return {
      title: element.value.trim(),
      badge: document.querySelector(`[data-highlight='badge'][data-index='${index}']`).value.trim(),
      image: document.querySelector(`[data-highlight='image'][data-index='${index}']`).value.trim(),
      text: document.querySelector(`[data-highlight='text'][data-index='${index}']`).value.trim()
    };
  });

  state.branches = collectBySelector("[data-branch='city']", (element) => {
    const index = Number(element.dataset.index);
    const getValue = (field) => document.querySelector(`[data-branch='${field}'][data-index='${index}']`).value.trim();
    return {
      city: element.value.trim(),
      number: getValue("number"),
      localNumber: getValue("localNumber"),
      address: getValue("address"),
      image: getValue("image"),
      hours: getValue("hours"),
      copy: getValue("copy"),
      mapUrl: getValue("mapUrl"),
      promoTitle: getValue("promoTitle"),
      promoText: getValue("promoText")
    };
  });

  state.products = collectBySelector("[data-product='name']", (element) => {
    const index = Number(element.dataset.index);
    const getValue = (field) => document.querySelector(`[data-product='${field}'][data-index='${index}']`).value.trim();
    const mainImage = getValue("image");
    const extraImages = getValue("images")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    return {
      name: element.value.trim(),
      category: getValue("category"),
      image: mainImage,
      images: extraImages,
      description: getValue("description"),
      tags: getValue("tags")
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
    };
  });
};

const addItem = (type) => {
  if (type === "stock-stat") {
    state.stockStats.push({ value: "0", label: "nuevo dato" });
  }
  if (type === "category") {
    state.categories.push({ title: "Nueva categoría", badge: "Nuevo", text: "Texto editable" });
  }
  if (type === "promotion") {
    state.promotions.push({
      title: "Nueva promoción",
      badge: "Promo",
      image: "assets/product-01.svg",
      buttonLabel: "Consultar",
      text: "Texto editable",
      message: "Hola quiero consultar esta promoción"
    });
  }
  if (type === "benefit") {
    state.benefits.push("Nuevo beneficio");
  }
  if (type === "testimonial") {
    state.testimonials.push({ name: "Cliente", review: "Nueva reseña" });
  }
  if (type === "highlight") {
    state.socialHighlights.push({ title: "Nueva tarjeta", badge: "Red", text: "Texto editable", image: "assets/product-01.svg" });
  }
  if (type === "branch") {
    state.branches.push({
      city: "Nueva sucursal",
      number: "59800000000",
      localNumber: "000 000 000",
      address: "Dirección",
      image: "assets/store-mercedes.svg",
      hours: "8:30 a 12:30 y 14:30 a 18:30",
      copy: "Texto de la sucursal",
      mapUrl: "https://maps.google.com",
      promoTitle: "Promo",
      promoText: "Texto promo"
    });
  }
  if (type === "product") {
    state.products.push({
      name: "Nuevo producto",
      category: "Sol",
      image: "assets/product-01.svg",
      images: [],
      description: "Descripción editable",
      tags: ["Nuevo"]
    });
  }

  renderAll();
};

const removeItem = (type, index) => {
  state[type].splice(index, 1);
  renderAll();
};

const moveItem = (type, index, direction) => {
  const nextIndex = index + direction;
  if (nextIndex < 0 || nextIndex >= state[type].length) {
    return;
  }

  const [item] = state[type].splice(index, 1);
  state[type].splice(nextIndex, 0, item);
  renderAll();
};

document.addEventListener("click", (event) => {
  const addButton = event.target.closest("[data-add]");
  const removeButton = event.target.closest("[data-remove]");
  const moveButton = event.target.closest("[data-move]");

  if (addButton) {
    rebuildStateFromForm();
    addItem(addButton.dataset.add);
    setStatus("Ítem agregado. Guardá para aplicar los cambios al sitio.");
  }

  if (removeButton) {
    rebuildStateFromForm();
    const mapping = {
      "stock-stat": "stockStats",
      category: "categories",
      promotion: "promotions",
      benefit: "benefits",
      testimonial: "testimonials",
      highlight: "socialHighlights",
      branch: "branches",
      product: "products"
    };
    removeItem(mapping[removeButton.dataset.remove], Number(removeButton.dataset.index));
    setStatus("Ítem eliminado. Guardá para aplicar los cambios al sitio.");
  }

  if (moveButton) {
    rebuildStateFromForm();
    moveItem("products", Number(moveButton.dataset.index), Number(moveButton.dataset.direction));
    state = dataStore.save(state);
    setStatus("Orden del catálogo actualizado.");
    refreshPreview();
  }
});

document.querySelector("#admin-form").addEventListener("input", (event) => {
  if (!event.target.closest("input, textarea, select")) {
    return;
  }

  schedulePreviewSync();
});

document.querySelector("#admin-form").addEventListener("change", (event) => {
  if (!event.target.closest("input, textarea, select")) {
    return;
  }

  schedulePreviewSync();
});

document.querySelector("#admin-form").addEventListener("submit", (event) => {
  event.preventDefault();
  rebuildStateFromForm();
  state = dataStore.save(state);
  setStatus("Cambios guardados en este navegador.");
  refreshPreview();
});

document.querySelector("#reset-data").addEventListener("click", () => {
  state = dataStore.reset();
  renderAll();
  setStatus("Se restauró la configuración base.");
  refreshPreview();
});

document.querySelector("#export-data").addEventListener("click", () => {
  rebuildStateFromForm();
  const file = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(file);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "site-data.json";
  anchor.click();
  URL.revokeObjectURL(url);
  setStatus("Se exportó site-data.json para publicar la web.");
});

document.querySelector("#import-file").addEventListener("change", async (event) => {
  const [file] = event.target.files;
  if (!file) {
    return;
  }

  try {
    const text = await file.text();
    state = dataStore.save(JSON.parse(text));
    renderAll();
    setStatus("Configuración importada correctamente.");
    refreshPreview();
  } catch (error) {
    setStatus("No se pudo importar el JSON. Revisá el archivo.");
  }
  event.target.value = "";
});

refreshPreviewButton.addEventListener("click", () => {
  syncPreviewDraft();
  setStatus("Vista previa actualizada con los cambios del formulario.");
});

document.querySelector("#change-admin-password").addEventListener("click", () => {
  const newPassword = document.querySelector("#new-admin-password").value.trim();

  if (newPassword.length < 4) {
    setStatus("La nueva contraseña debe tener al menos 4 caracteres.");
    return;
  }

  dataStore.setAdminPassword(newPassword);
  document.querySelector("#new-admin-password").value = "";
  setStatus("Contraseña actualizada en este navegador.");
});

document.querySelector("#logout-admin").addEventListener("click", () => {
  dataStore.clearAdminSession();
  authLayer.classList.remove("is-hidden");
  document.body.classList.add("admin-locked");
  authHint.textContent = "";
  authInput.value = "";
  authInput.focus();
});

authForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!dataStore.verifyAdminPassword(authInput.value)) {
    authHint.textContent = "Contraseña incorrecta.";
    return;
  }

  dataStore.authorizeAdminSession();
  authHint.textContent = "";
  await unlockAdmin();
});

const initAdmin = async () => {
  if (dataStore.hasAdminSession()) {
    await unlockAdmin();
    return;
  }

  document.body.classList.add("admin-locked");
  authInput.focus();
  setStatus("Usá el panel para editar y luego exportar site-data.json para publicar.");
};

initAdmin();