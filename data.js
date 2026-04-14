(function () {
  const STORAGE_KEY = "optica-del-rey-site-data";
  const REMOTE_DATA_URL = "site-data.json";
  const ADMIN_PASSWORD_KEY = "optica-del-rey-admin-password";
  const ADMIN_SESSION_KEY = "optica-del-rey-admin-session";
  const DEFAULT_ADMIN_PASSWORD = "Optica_del_Rey";

  const defaultSiteData = {
    business: {
      name: "Óptica del Rey",
      description: "Óptica del Rey ofrece lentes modernos, cómodos y de alta calidad, cristales y lentes de contacto con atención personalizada por WhatsApp.",
      heroEyebrow: "Colección destacada",
      heroTitle: "Óptica del Rey",
      heroSubtitle: "Lentes de calidad con diseño moderno",
      heroNote: "Sol, receta, cristales y lentes de contacto en un solo lugar",
      heroButtonLabel: "Consultar por WhatsApp",
      heroButtonMessage: "Hola quiero asesoramiento sobre lentes, cristales o lentes de contacto",
      stockEyebrow: "Atención personalizada",
      stockTitle: "Todo para tu visión y tu estilo",
      stockText: "Trabajamos con un catálogo amplio de armazones, cristales y lentes de contacto, con más de 170 alternativas para consultar por WhatsApp. Escribinos y te confirmamos opciones, colores y disponibilidad.",
      stockButtonLabel: "Consultar stock completo",
      stockButtonMessage: "Hola quiero consultar stock y disponibilidad",
      aboutEyebrow: "Sobre nosotros",
      aboutTitle: "Óptica del Rey",
      aboutText: "En Óptica del Rey ofrecemos lentes modernos, cómodos y de alta calidad, además de cristales y lentes de contacto con asesoramiento personalizado.",
      providerTag: "Atención destacada",
      providerTitle: "Asesoramiento real",
      providerText: "Te ayudamos a elegir el modelo, el cristal o la solución de contacto ideal según tu necesidad.",
      socialEyebrow: "Redes sociales",
      socialTitle: "Instagram y Facebook como vidriera diaria de la óptica",
      socialText: "Mostramos novedades, atención en local y líneas destacadas para Mercedes y Fray Bentos. Desde redes derivamos consultas directas por WhatsApp.",
      contactEyebrow: "Contacto",
      contactTitle: "Consultá y cerrá tu compra por WhatsApp",
      contactText: "Respondemos consultas sobre modelos, cristales, lentes de contacto, disponibilidad, colores, sucursal y asesoramiento para elegir mejor.",
      contactNote: "Elegí la sucursal más cercana y respondemos directo por WhatsApp.",
      contactButtonLabel: "Consultar por WhatsApp",
      contactButtonMessage: "Hola quiero hacer una consulta sobre productos ópticos",
      paymentLabel: "Medios de pago",
      paymentMethods: ["VISA", "Mastercard", "OCA", "ANDA", "Débito", "Efectivo"],
      paymentBenefitLabel: "Beneficio social",
      paymentBenefitBadge: "BPS",
      paymentBenefitText: "Aceptamos beneficios ópticos del BPS",
      footerWhatsappLabel: "Hablar por WhatsApp",
      footerWhatsappMessage: "Hola quiero información sobre productos ópticos"
    },
    links: {
      instagram: "https://www.instagram.com/opticadelrey/",
      facebook: "https://www.facebook.com/opticadelreyuy"
    },
    trustItems: ["Lentes de sol", "Receta", "Cristales", "Lentes de contacto"],
    stockStats: [
        {
          "value": "96+",
          "label": "modelos de sol y receta"
        },
        {
          "value": "32+",
          "label": "opciones en cristales"
        },
        {
          "value": "38+",
          "label": "alternativas en contacto"
        }
      ],
    catalogFilters: [
        "Todos",
        "Sol",
        "Receta",
        "Cristales",
        "Lentes de contacto",
        "Nuevos ingresos",
        "Colección nueva",
        "Más consultados"
      ],
    categories: [
      {
        title: "Lentes de sol",
        text: "Modelos con presencia premium, livianos y listos para destacar cualquier look.",
        badge: "Protección + estilo"
      },
      {
        title: "Lentes ópticos",
        text: "Diseños elegantes y cómodos para uso diario, trabajo o estudio.",
        badge: "Comodidad diaria"
      },
      {
        title: "Cristales",
        text: "Opciones con tratamientos y terminaciones pensadas para mejorar confort y rendimiento visual.",
        badge: "Visión precisa"
      },
      {
        title: "Lentes de contacto",
        text: "Alternativas diarias, mensuales y productos de mantenimiento con asesoramiento personalizado.",
        badge: "Practicidad total"
      },
      {
        title: "Nuevos ingresos",
        text: "Selección inspirada en tendencias actuales y colecciones modernas.",
        badge: "Última colección"
      }
    ],
    promotions: [
      {
        title: "Promo de temporada",
        badge: "Vigente",
        image: "assets/product-01.svg",
        buttonLabel: "Consultar promo",
        text: "Consultá por beneficios vigentes en lentes de sol y receta seleccionados en ambas sucursales.",
        message: "Hola quiero consultar las promociones vigentes"
      },
      {
        title: "Cristales con tratamientos",
        badge: "Cristales",
        image: "assets/product-05.svg",
        buttonLabel: "Consultar cristales",
        text: "Opciones con antirreflejo, filtro azul y fotocromático según tu receta y tu rutina diaria.",
        message: "Hola quiero consultar opciones de cristales"
      },
      {
        title: "Lentes de contacto",
        badge: "Contacto",
        image: "assets/product-02.svg",
        buttonLabel: "Consultar contacto",
        text: "Te asesoramos en reposición, uso diario o mensual y productos de mantenimiento.",
        message: "Hola quiero consultar por lentes de contacto"
      }
    ],
    branches: [
      {
        city: "Mercedes",
        number: "59892216734",
        localNumber: "092 216 734",
        address: "Artigas 279, semipeatonal",
        image: "assets/local-interior.jpeg",
        hours: "8:30 a 12:30 y 14:30 a 18:30",
        copy: "Un local pensado para atención cercana, asesoramiento visual y entrega rápida en el centro de Mercedes.",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Artigas+279+Mercedes+Uruguay",
        promoTitle: "Promos por WhatsApp",
        promoText: "Consultá ingresos nuevos, campañas vigentes y opciones disponibles para Mercedes."
      },
      {
        city: "Fray Bentos",
        number: "59898990622",
        localNumber: "098 990 622",
        address: "18 de Julio 2030",
        image: "assets/marca-cartel.jpeg",
        hours: "8:30 a 12:30 y 14:30 a 18:30",
        copy: "Atención personalizada para receta, cristales, sol y contacto, con seguimiento directo por WhatsApp desde Fray Bentos.",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=18+de+Julio+2030+Fray+Bentos+Uruguay",
        promoTitle: "Promos y novedades",
        promoText: "Escribinos para consultar modelos nuevos, disponibilidad y oportunidades vigentes en Fray Bentos."
      }
    ],
    products: [
        {
          "name": "Arnette Sol AN4161",
          "description": "Modelo solar con línea urbana, ideal para quienes buscan presencia liviana y cómoda.",
          "image": "https://grupoaltavista.com.uy/storage/products/thumbnails/an416120886g.jpg",
          "tags": [
            "Sol",
            "Arnette",
            "AN4161"
          ],
          "category": "Sol"
        },
        {
          "name": "Arnette Sol AN4178",
          "description": "Diseño solar moderno con buena cobertura y estilo actual para uso diario.",
          "image": "https://grupoaltavista.com.uy/storage/products/thumbnails/an417825936q.jpg",
          "images": [
            "https://grupoaltavista.com.uy/storage/products/thumbnails/an417825936q.jpg",
            "https://grupoaltavista.com.uy/storage/products/thumbnails/an41782594n0.jpg"
          ],
          "tags": [
            "Sol",
            "Arnette",
            "AN4178"
          ],
          "category": "Sol"
        },
        {
          "name": "Armani Exchange Sol AX2023",
          "description": "Opción solar de perfil urbano, pensada para destacar con una estética limpia y contemporánea.",
          "image": "https://grupoaltavista.com.uy/storage/products/thumbnails/ax2023s60886g.jpg",
          "images": [
            "https://grupoaltavista.com.uy/storage/products/thumbnails/ax2023s60886g.jpg",
            "https://grupoaltavista.com.uy/storage/products/thumbnails/ax2023s606355.jpg"
          ],
          "tags": [
            "Sol",
            "Armani Exchange",
            "AX2023"
          ],
          "category": "Sol"
        },
        {
          "name": "Polar Sol K607",
          "description": "Modelo solar versátil con alternativas de color y una imagen fresca para todos los días.",
          "image": "https://grupoaltavista.com.uy/storage/products/thumbnails/k60777.JPG",
          "images": [
            "https://grupoaltavista.com.uy/storage/products/thumbnails/k60777.JPG",
            "https://grupoaltavista.com.uy/storage/products/thumbnails/k60719.JPG",
            "https://grupoaltavista.com.uy/storage/products/thumbnails/k60708.JPG"
          ],
          "tags": [
            "Sol",
            "Polar",
            "Múltiples colores"
          ],
          "category": "Sol"
        },
        {
          "name": "Ray-Ban Receta RX7047",
          "description": "Armazón de receta square, cómodo y elegante para oficina, estudio o uso diario.",
          "image": "https://grupoaltavista.com.uy/storage/products/thumbnails/rx7047594354.jpg",
          "images": [
            "https://grupoaltavista.com.uy/storage/products/thumbnails/rx7047594354.jpg",
            "https://grupoaltavista.com.uy/storage/products/thumbnails/rx7047810054.jpg",
            "https://grupoaltavista.com.uy/storage/products/thumbnails/rx7047201254.jpg"
          ],
          "tags": [
            "Receta",
            "Ray-Ban",
            "Square"
          ],
          "category": "Receta"
        },
        {
          "name": "Arnette Receta AN6005",
          "description": "Armazón de receta liviano y actual, ideal para quienes buscan comodidad y diseño moderno.",
          "image": "https://grupoaltavista.com.uy/storage/products/thumbnails/an60055805216.jpg",
          "tags": [
            "Receta",
            "Arnette",
            "AN6005"
          ],
          "category": "Receta"
        },
        {
          "name": "Arnette Receta AN7164",
          "description": "Referencia de receta con impronta actual y consulta disponible para ambas sucursales.",
          "image": "https://grupoaltavista.com.uy/storage/products/thumbnails/an71642375.jpg",
          "tags": [
            "Receta",
            "Arnette",
            "AN7164"
          ],
          "category": "Nuevos ingresos"
        },
        {
          "name": "Cristales Antirreflejo Premium",
          "description": "Pensados para reducir reflejos y mejorar la comodidad visual en pantallas, manejo y uso diario.",
          "image": "assets/product-04.svg",
          "tags": [
            "Cristales",
            "Antirreflejo",
            "Confort visual"
          ],
          "category": "Cristales"
        },
        {
          "name": "Cristales con Filtro Azul",
          "description": "Opción recomendada para quienes pasan muchas horas frente a pantallas y buscan mayor descanso visual.",
          "image": "assets/product-05.svg",
          "tags": [
            "Cristales",
            "Filtro azul",
            "Pantallas"
          ],
          "category": "Cristales"
        },
        {
          "name": "Cristales Fotocromáticos",
          "description": "Se adaptan a cambios de luz para una experiencia práctica entre interior y exterior.",
          "image": "assets/product-06.svg",
          "tags": [
            "Cristales",
            "Fotocromáticos",
            "Versátiles"
          ],
          "category": "Cristales"
        },
        {
          "name": "Lentes de Contacto Diarios",
          "description": "Alternativa cómoda y práctica para uso puntual o rutina diaria con recambio frecuente.",
          "image": "https://grupoaltavista.com.uy/storage/pages/d19e9a4255f7cc797b9bd785968fb0dc.jpg",
          "tags": [
            "Lentes de contacto",
            "Diarios",
            "Comodidad"
          ],
          "category": "Lentes de contacto"
        },
        {
          "name": "Lentes de Contacto Mensuales",
          "description": "Opciones para uso continuo con asesoramiento según graduación, rutina y cuidados.",
          "image": "https://grupoaltavista.com.uy/storage/pages/ef70f9265fa47dabc1be988c662359d2.jpg",
          "tags": [
            "Lentes de contacto",
            "Mensuales",
            "Asesoramiento"
          ],
          "category": "Lentes de contacto"
        },
        {
          "name": "Soluciones y Accesorios para Contacto",
          "description": "Complementos para limpieza, conservación y mantenimiento de tus lentes de contacto.",
          "image": "https://grupoaltavista.com.uy/storage/pages/1721eb9ee064106cd66c5993dedc1ea3.jpg",
          "tags": [
            "Lentes de contacto",
            "Soluciones",
            "Cuidado"
          ],
          "category": "Lentes de contacto"
        },
        {
          "name": "Arnette Sol AN4260",
          "description": "Línea solar deportiva con buen ajuste y estética contemporánea para uso urbano.",
          "image": "https://grupoaltavista.com.uy/storage/products/thumbnails/an4260014v.jpg",
          "tags": [
            "Sol",
            "Arnette",
            "AN4260"
          ],
          "category": "Sol"
        },
        {
          "name": "Ray-Ban Sol RB3025",
          "description": "Modelo icónico de aviador para quienes buscan una silueta clásica y atemporal.",
          "image": "https://grupoaltavista.com.uy/storage/products/thumbnails/rb3025w087958.jpg",
          "images": [
            "https://grupoaltavista.com.uy/storage/products/thumbnails/rb3025w087958.jpg",
            "https://grupoaltavista.com.uy/storage/products/thumbnails/rb3025l020558.jpg",
            "https://grupoaltavista.com.uy/storage/products/thumbnails/rb3025l282358.jpg"
          ],
          "tags": [
            "Sol",
            "Ray-Ban",
            "RB3025"
          ],
          "category": "Sol"
        },
        {
          "name": "Vogue Sol VO2795",
          "description": "Opción solar de moda con líneas limpias y una presencia liviana para uso diario.",
          "image": "https://grupoaltavista.com.uy/storage/products/thumbnails/vo2795s21744853.jpg",
          "tags": [
            "Sol",
            "Vogue",
            "VO2795"
          ],
          "category": "Nuevos ingresos"
        },
        {
          "name": "Emporio Armani Receta EA3109",
          "description": "Armazón óptico elegante para combinar estilo profesional y comodidad prolongada.",
          "image": "https://grupoaltavista.com.uy/storage/products/thumbnails/ea31095603.jpg",
          "tags": [
            "Receta",
            "Emporio Armani",
            "EA3109"
          ],
          "category": "Receta"
        },
        {
          "name": "Ray-Ban Receta RB2132",
          "description": "Montura óptica versátil con diseño moderno para rutina laboral o estudio.",
          "image": "https://grupoaltavista.com.uy/storage/products/thumbnails/rb213290158.jpg",
          "images": [
            "https://grupoaltavista.com.uy/storage/products/thumbnails/rb213290158.jpg",
            "https://grupoaltavista.com.uy/storage/products/thumbnails/rb21329015855.jpg"
          ],
          "tags": [
            "Receta",
            "Ray-Ban",
            "RB2132"
          ],
          "category": "Receta"
        },
        {
          "name": "Cristales Alta Definición HD",
          "description": "Cristales orientados a mayor nitidez y contraste, ideales para uso intensivo.",
          "image": "assets/product-06.svg",
          "tags": [
            "Cristales",
            "HD",
            "Nitidez"
          ],
          "category": "Cristales"
        },
        {
          "name": "Lentes de Contacto Tóricos",
          "description": "Alternativas para corrección de astigmatismo con adaptación guiada por el equipo.",
          "image": "https://grupoaltavista.com.uy/storage/pages/1721eb9ee064106cd66c5993dedc1ea3.jpg",
          "tags": [
            "Lentes de contacto",
            "Tóricos",
            "Astigmatismo"
          ],
          "category": "Lentes de contacto"
        },
        {
          "name": "Lentes de Contacto Multifocales",
          "description": "Diseñados para visión cercana e inmedia con asesoramiento personalizado.",
          "image": "https://grupoaltavista.com.uy/storage/pages/727ce679412dfa88caaa8ea1a27d401c.jpg",
          "tags": [
            "Lentes de contacto",
            "Multifocales",
            "Confort"
          ],
          "category": "Lentes de contacto"
        },
        {
          "name": "Ray-Ban Sol RB2140",
          "description": "Modelo Wayfarer clásico con gran presencia y uso urbano diario.",
          "image": "https://grupoaltavista.com.uy/storage/products/thumbnails/rb21409015850.jpg",
          "tags": [
            "Sol",
            "Ray-Ban",
            "RB2140"
          ],
          "category": "Sol"
        },
        {
          "name": "Ray-Ban Sol RB0360S",
          "description": "Diseño moderno con carácter y excelente cobertura para exteriores.",
          "image": "assets/product-02.svg",
          "tags": [
            "Sol",
            "Ray-Ban",
            "RB0360S"
          ],
          "category": "Sol"
        },
        {
          "name": "Ray-Ban Sol RB2231",
          "description": "Línea nueva con impronta actual para looks urbanos.",
          "image": "assets/product-03.svg",
          "tags": [
            "Sol",
            "Ray-Ban",
            "RB2231"
          ],
          "category": "Sol"
        },
        {
          "name": "Armani Exchange Sol AX2045S",
          "description": "Opción de sol actual con estilo urbano y ajuste cómodo.",
          "image": "assets/product-02.svg",
          "tags": [
            "Sol",
            "Armani Exchange",
            "AX2045S"
          ],
          "category": "Sol"
        },
        {
          "name": "Armani Exchange Sol AX2050S",
          "description": "Armazón solar de líneas limpias para uso diario y salida.",
          "image": "assets/product-03.svg",
          "tags": [
            "Sol",
            "Armani Exchange",
            "AX2050S"
          ],
          "category": "Sol"
        },
        {
          "name": "Arnette Sol AN7158",
          "description": "Diseño liviano y juvenil con estética fresca y moderna.",
          "image": "assets/product-01.svg",
          "tags": [
            "Sol",
            "Arnette",
            "AN7158"
          ],
          "category": "Sol"
        },
        {
          "name": "Arnette Sol AN7169",
          "description": "Referencia solar con presencia deportiva y comodidad prolongada.",
          "image": "assets/product-02.svg",
          "tags": [
            "Sol",
            "Arnette",
            "AN7169"
          ],
          "category": "Sol"
        },
        {
          "name": "Vogue Sol VO2845",
          "description": "Modelo femenino con líneas elegantes y presencia de moda.",
          "image": "assets/product-03.svg",
          "tags": [
            "Sol",
            "Vogue",
            "VO2845"
          ],
          "category": "Sol"
        },
        {
          "name": "Vogue Sol VO2864",
          "description": "Estilo actual para uso diario con excelente balance visual.",
          "image": "assets/product-02.svg",
          "tags": [
            "Sol",
            "Vogue",
            "VO2864"
          ],
          "category": "Sol"
        },
        {
          "name": "Polar Sol K610",
          "description": "Lente solar versátil con múltiples combinaciones de color.",
          "image": "https://grupoaltavista.com.uy/storage/products/thumbnails/k60719.JPG",
          "tags": [
            "Sol",
            "Polar",
            "K610"
          ],
          "category": "Sol"
        },
        {
          "name": "Ray-Ban Receta RX7140",
          "description": "Armazón de receta liviano y refinado para uso prolongado.",
          "image": "assets/product-04.svg",
          "tags": [
            "Receta",
            "Ray-Ban",
            "RX7140"
          ],
          "category": "Receta"
        },
        {
          "name": "Ray-Ban Receta RX3447V",
          "description": "Diseño redondo con personalidad clásica y actual.",
          "image": "assets/product-05.svg",
          "tags": [
            "Receta",
            "Ray-Ban",
            "RX3447V"
          ],
          "category": "Receta"
        },
        {
          "name": "Arnette Receta AN6001",
          "description": "Modelo de receta cómodo, resistente y moderno.",
          "image": "assets/product-05.svg",
          "tags": [
            "Receta",
            "Arnette",
            "AN6001"
          ],
          "category": "Receta"
        },
        {
          "name": "Arnette Receta AN7148",
          "description": "Armazón óptico con impronta juvenil y gran confort.",
          "image": "assets/product-06.svg",
          "tags": [
            "Receta",
            "Arnette",
            "AN7148"
          ],
          "category": "Receta"
        },
        {
          "name": "Emporio Armani Receta EA3035",
          "description": "Diseño elegante para quienes buscan perfil profesional.",
          "image": "assets/product-04.svg",
          "tags": [
            "Receta",
            "Emporio Armani",
            "EA3035"
          ],
          "category": "Receta"
        },
        {
          "name": "Emporio Armani Receta EA3047",
          "description": "Montura premium con líneas limpias y excelente ajuste.",
          "image": "assets/product-05.svg",
          "tags": [
            "Receta",
            "Emporio Armani",
            "EA3047"
          ],
          "category": "Receta"
        },
        {
          "name": "Armani Exchange Receta AX1061",
          "description": "Armazón óptico urbano, ideal para oficina o estudio.",
          "image": "assets/product-04.svg",
          "tags": [
            "Receta",
            "Armani Exchange",
            "AX1061"
          ],
          "category": "Receta"
        },
        {
          "name": "Armani Exchange Receta AX1071",
          "description": "Modelo de receta sobrio y cómodo para uso diario.",
          "image": "assets/product-06.svg",
          "tags": [
            "Receta",
            "Armani Exchange",
            "AX1071"
          ],
          "category": "Receta"
        },
        {
          "name": "Vogue Receta VO5412",
          "description": "Armazón de receta elegante con estilo contemporáneo.",
          "image": "assets/product-05.svg",
          "tags": [
            "Receta",
            "Vogue",
            "VO5412"
          ],
          "category": "Receta"
        },
        {
          "name": "Cristales Antirreflejo Plus",
          "description": "Mayor confort visual y reducción de reflejos en pantalla.",
          "image": "assets/product-04.svg",
          "tags": [
            "Cristales",
            "Antirreflejo",
            "Plus"
          ],
          "category": "Cristales"
        },
        {
          "name": "Cristales Filtro Azul Pro",
          "description": "Protección mejorada para largas jornadas frente a pantallas.",
          "image": "assets/product-05.svg",
          "tags": [
            "Cristales",
            "Filtro azul",
            "Pro"
          ],
          "category": "Cristales"
        },
        {
          "name": "Cristales Fotocromáticos Pro",
          "description": "Transición rápida entre interior y exterior con comodidad.",
          "image": "assets/product-06.svg",
          "tags": [
            "Cristales",
            "Fotocromáticos",
            "Pro"
          ],
          "category": "Cristales"
        },
        {
          "name": "Cristales Policarbonato Resistente",
          "description": "Alta resistencia para uso activo y mayor seguridad.",
          "image": "assets/product-04.svg",
          "tags": [
            "Cristales",
            "Policarbonato",
            "Resistente"
          ],
          "category": "Cristales"
        },
        {
          "name": "Cristales Ocupacionales Oficina",
          "description": "Optimización visual para distancias cortas e intermedias.",
          "image": "assets/product-05.svg",
          "tags": [
            "Cristales",
            "Ocupacionales",
            "Oficina"
          ],
          "category": "Cristales"
        },
        {
          "name": "Cristales Progresivos Premium",
          "description": "Visión fluida para diferentes distancias con gran confort.",
          "image": "assets/product-06.svg",
          "tags": [
            "Cristales",
            "Progresivos",
            "Premium"
          ],
          "category": "Cristales"
        },
        {
          "name": "Lentes de Contacto Optimum Comfort",
          "description": "Uso diario con alto confort y buena hidratación.",
          "image": "https://grupoaltavista.com.uy/storage/pages/d19e9a4255f7cc797b9bd785968fb0dc.jpg",
          "tags": [
            "Lentes de contacto",
            "Optimum",
            "Comfort"
          ],
          "category": "Lentes de contacto"
        },
        {
          "name": "Lentes de Contacto Alcon Total",
          "description": "Excelente estabilidad visual y confort para jornada extensa.",
          "image": "https://grupoaltavista.com.uy/storage/pages/ef70f9265fa47dabc1be988c662359d2.jpg",
          "tags": [
            "Lentes de contacto",
            "Alcon",
            "Total"
          ],
          "category": "Lentes de contacto"
        },
        {
          "name": "Lentes de Contacto Avizor Daily",
          "description": "Alternativa práctica para rutina dinámica y uso confiable.",
          "image": "https://grupoaltavista.com.uy/storage/pages/1721eb9ee064106cd66c5993dedc1ea3.jpg",
          "tags": [
            "Lentes de contacto",
            "Avizor",
            "Daily"
          ],
          "category": "Lentes de contacto"
        },
        {
          "name": "Lentes de Contacto Bi-Oh Soft",
          "description": "Buen desempeño para quienes priorizan comodidad continua.",
          "image": "https://grupoaltavista.com.uy/storage/pages/727ce679412dfa88caaa8ea1a27d401c.jpg",
          "tags": [
            "Lentes de contacto",
            "Bi-Oh",
            "Soft"
          ],
          "category": "Lentes de contacto"
        },
        {
          "name": "Lentes de Contacto para Astigmatismo Plus",
          "description": "Opciones para astigmatismo con ajuste guiado por el equipo.",
          "image": "https://grupoaltavista.com.uy/storage/pages/1721eb9ee064106cd66c5993dedc1ea3.jpg",
          "tags": [
            "Lentes de contacto",
            "Astigmatismo",
            "Tóricos"
          ],
          "category": "Lentes de contacto"
        },
        {
          "name": "Kit Solución + Estuche Premium",
          "description": "Kit completo de mantenimiento para conservar tus lentes.",
          "image": "https://grupoaltavista.com.uy/storage/pages/1721eb9ee064106cd66c5993dedc1ea3.jpg",
          "tags": [
            "Lentes de contacto",
            "Soluciones",
            "Kit"
          ],
          "category": "Lentes de contacto"
        },
        {
          "name": "Nuevos Ingresos Vogue VO2847",
          "description": "Nuevo modelo de temporada con líneas de moda.",
          "image": "assets/product-03.svg",
          "tags": [
            "Nuevos ingresos",
            "Vogue",
            "VO2847"
          ],
          "category": "Nuevos ingresos"
        },
        {
          "name": "Nuevos Ingresos Emporio Armani EA4034",
          "description": "Línea recién llegada con estilo premium.",
          "image": "assets/product-04.svg",
          "tags": [
            "Nuevos ingresos",
            "Emporio Armani",
            "EA4034"
          ],
          "category": "Nuevos ingresos"
        },
        {
          "name": "Ray-Ban Sol RB2289",
          "description": "Ray-Ban sol con diseño actual, alto confort y asesoramiento personalizado en sucursal.",
          "image": "assets/product-03.svg",
          "tags": [
            "Sol",
            "Ray-Ban",
            "RB2289",
            "Más consultados"
          ],
          "category": "Sol"
        },
        {
          "name": "Ray-Ban Sol RB2242",
          "description": "Ray-Ban sol con diseño actual, alto confort y asesoramiento personalizado en sucursal.",
          "image": "assets/product-01.svg",
          "tags": [
            "Sol",
            "Ray-Ban",
            "RB2242",
            "Colección nueva"
          ],
          "category": "Sol"
        },
        {
          "name": "Ray-Ban Sol RB2216",
          "description": "Ray-Ban sol con diseño actual, alto confort y asesoramiento personalizado en sucursal.",
          "image": "assets/product-02.svg",
          "tags": [
            "Sol",
            "Ray-Ban",
            "RB2216",
            "Más consultados"
          ],
          "category": "Sol"
        },
        {
          "name": "Ray-Ban Sol RB2218",
          "description": "Ray-Ban sol con diseño actual, alto confort y asesoramiento personalizado en sucursal.",
          "image": "assets/product-03.svg",
          "tags": [
            "Sol",
            "Ray-Ban",
            "RB2218",
            "Colección nueva"
          ],
          "category": "Sol"
        },
        {
          "name": "Armani Exchange Sol AX2035S",
          "description": "Armani Exchange sol con diseño actual, alto confort y asesoramiento personalizado en sucursal.",
          "image": "assets/product-01.svg",
          "tags": [
            "Sol",
            "Armani Exchange",
            "AX2035S",
            "Más consultados"
          ],
          "category": "Sol"
        },
        {
          "name": "Armani Exchange Sol AX2042S",
          "description": "Armani Exchange sol con diseño actual, alto confort y asesoramiento personalizado en sucursal.",
          "image": "assets/product-02.svg",
          "tags": [
            "Sol",
            "Armani Exchange",
            "AX2042S",
            "Colección nueva"
          ],
          "category": "Sol"
        },
        {
          "name": "Armani Exchange Sol AX2027S",
          "description": "Armani Exchange sol con diseño actual, alto confort y asesoramiento personalizado en sucursal.",
          "image": "assets/product-03.svg",
          "tags": [
            "Sol",
            "Armani Exchange",
            "AX2027S",
            "Colección nueva"
          ],
          "category": "Sol"
        },
        {
          "name": "Arnette Sol AN7147",
          "description": "Arnette sol con diseño actual, alto confort y asesoramiento personalizado en sucursal.",
          "image": "assets/product-01.svg",
          "tags": [
            "Sol",
            "Arnette",
            "AN7147",
            "Más consultados"
          ],
          "category": "Sol"
        },
        {
          "name": "Arnette Sol AN7146",
          "description": "Arnette sol con diseño actual, alto confort y asesoramiento personalizado en sucursal.",
          "image": "assets/product-02.svg",
          "tags": [
            "Sol",
            "Arnette",
            "AN7146",
            "Colección nueva"
          ],
          "category": "Sol"
        },
        {
          "name": "Vogue Sol VO2846",
          "description": "Vogue sol con diseño actual, alto confort y asesoramiento personalizado en sucursal.",
          "image": "assets/product-03.svg",
          "tags": [
            "Sol",
            "Vogue",
            "VO2846",
            "Colección nueva"
          ],
          "category": "Sol"
        },
        {
          "name": "Ray-Ban Receta RX6517",
          "description": "Ray-Ban receta con diseño actual, alto confort y asesoramiento personalizado en sucursal.",
          "image": "assets/product-04.svg",
          "tags": [
            "Receta",
            "Ray-Ban",
            "RX6517",
            "Más consultados"
          ],
          "category": "Receta"
        },
        {
          "name": "Ray-Ban Receta RX7225",
          "description": "Ray-Ban receta con diseño actual, alto confort y asesoramiento personalizado en sucursal.",
          "image": "assets/product-05.svg",
          "tags": [
            "Receta",
            "Ray-Ban",
            "RX7225",
            "Colección nueva"
          ],
          "category": "Receta"
        },
        {
          "name": "Ray-Ban Receta RX4378V",
          "description": "Ray-Ban receta con diseño actual, alto confort y asesoramiento personalizado en sucursal.",
          "image": "assets/product-06.svg",
          "tags": [
            "Receta",
            "Ray-Ban",
            "RX4378V",
            "Más consultados"
          ],
          "category": "Receta"
        },
        {
          "name": "Emporio Armani Receta EA3008",
          "description": "Emporio Armani receta con diseño actual, alto confort y asesoramiento personalizado en sucursal.",
          "image": "assets/product-04.svg",
          "tags": [
            "Receta",
            "Emporio Armani",
            "EA3008",
            "Colección nueva"
          ],
          "category": "Receta"
        },
        {
          "name": "Emporio Armani Receta EA3015",
          "description": "Emporio Armani receta con diseño actual, alto confort y asesoramiento personalizado en sucursal.",
          "image": "assets/product-05.svg",
          "tags": [
            "Receta",
            "Emporio Armani",
            "EA3015",
            "Más consultados"
          ],
          "category": "Receta"
        },
        {
          "name": "Emporio Armani Receta EA3032",
          "description": "Emporio Armani receta con diseño actual, alto confort y asesoramiento personalizado en sucursal.",
          "image": "assets/product-06.svg",
          "tags": [
            "Receta",
            "Emporio Armani",
            "EA3032",
            "Colección nueva"
          ],
          "category": "Receta"
        },
        {
          "name": "Armani Exchange Receta AX1074",
          "description": "Armani Exchange receta con diseño actual, alto confort y asesoramiento personalizado en sucursal.",
          "image": "assets/product-04.svg",
          "tags": [
            "Receta",
            "Armani Exchange",
            "AX1074",
            "Más consultados"
          ],
          "category": "Receta"
        },
        {
          "name": "Armani Exchange Receta AX1073",
          "description": "Armani Exchange receta con diseño actual, alto confort y asesoramiento personalizado en sucursal.",
          "image": "assets/product-05.svg",
          "tags": [
            "Receta",
            "Armani Exchange",
            "AX1073",
            "Colección nueva"
          ],
          "category": "Receta"
        },
        {
          "name": "Arnette Receta AN6017",
          "description": "Arnette receta con diseño actual, alto confort y asesoramiento personalizado en sucursal.",
          "image": "assets/product-06.svg",
          "tags": [
            "Receta",
            "Arnette",
            "AN6017",
            "Colección nueva"
          ],
          "category": "Receta"
        },
        {
          "name": "Vogue Receta VO5414",
          "description": "Vogue receta con diseño actual, alto confort y asesoramiento personalizado en sucursal.",
          "image": "assets/product-04.svg",
          "tags": [
            "Receta",
            "Vogue",
            "VO5414",
            "Más consultados"
          ],
          "category": "Receta"
        },
        {
          "name": "Cristales Ultralivianos 1.67",
          "description": "Cristales cristales con diseño actual, alto confort y asesoramiento personalizado en sucursal.",
          "image": "assets/product-05.svg",
          "tags": [
            "Cristales",
            "Cristales",
            "CL167",
            "Más consultados"
          ],
          "category": "Cristales"
        },
        {
          "name": "Cristales Ultralivianos 1.74",
          "description": "Cristales cristales con diseño actual, alto confort y asesoramiento personalizado en sucursal.",
          "image": "assets/product-06.svg",
          "tags": [
            "Cristales",
            "Cristales",
            "CL174",
            "Colección nueva"
          ],
          "category": "Cristales"
        },
        {
          "name": "Cristales Drive Nocturno",
          "description": "Cristales cristales con diseño actual, alto confort y asesoramiento personalizado en sucursal.",
          "image": "assets/product-04.svg",
          "tags": [
            "Cristales",
            "Cristales",
            "DRIVE-N",
            "Más consultados"
          ],
          "category": "Cristales"
        },
        {
          "name": "Cristales Alto Impacto Sport",
          "description": "Cristales cristales con diseño actual, alto confort y asesoramiento personalizado en sucursal.",
          "image": "assets/product-05.svg",
          "tags": [
            "Cristales",
            "Cristales",
            "SPORT-HI",
            "Colección nueva"
          ],
          "category": "Cristales"
        },
        {
          "name": "Cristales Office Plus",
          "description": "Cristales cristales con diseño actual, alto confort y asesoramiento personalizado en sucursal.",
          "image": "assets/product-06.svg",
          "tags": [
            "Cristales",
            "Cristales",
            "OFF-PLUS",
            "Más consultados"
          ],
          "category": "Cristales"
        },
        {
          "name": "Cristales Digital FreeForm",
          "description": "Cristales cristales con diseño actual, alto confort y asesoramiento personalizado en sucursal.",
          "image": "assets/product-04.svg",
          "tags": [
            "Cristales",
            "Cristales",
            "DGF-FR",
            "Colección nueva"
          ],
          "category": "Cristales"
        },
        {
          "name": "Lentes de Contacto Semanales",
          "description": "Optimum lentes de contacto con diseño actual, alto confort y asesoramiento personalizado en sucursal.",
          "image": "https://grupoaltavista.com.uy/storage/pages/d19e9a4255f7cc797b9bd785968fb0dc.jpg",
          "tags": [
            "Lentes de contacto",
            "Optimum",
            "LC-SEMANAL",
            "Más consultados"
          ],
          "category": "Lentes de contacto"
        },
        {
          "name": "Lentes de Contacto Hidrogel Plus",
          "description": "Alcon lentes de contacto con diseño actual, alto confort y asesoramiento personalizado en sucursal.",
          "image": "https://grupoaltavista.com.uy/storage/pages/ef70f9265fa47dabc1be988c662359d2.jpg",
          "tags": [
            "Lentes de contacto",
            "Alcon",
            "LC-HPLUS",
            "Colección nueva"
          ],
          "category": "Lentes de contacto"
        },
        {
          "name": "Lentes de Contacto Silicona Premium",
          "description": "Avizor lentes de contacto con diseño actual, alto confort y asesoramiento personalizado en sucursal.",
          "image": "https://grupoaltavista.com.uy/storage/pages/1721eb9ee064106cd66c5993dedc1ea3.jpg",
          "tags": [
            "Lentes de contacto",
            "Avizor",
            "LC-SILP",
            "Más consultados"
          ],
          "category": "Lentes de contacto"
        },
        {
          "name": "Lentes de Contacto Multifocal Plus",
          "description": "Bi-Oh lentes de contacto con diseño actual, alto confort y asesoramiento personalizado en sucursal.",
          "image": "https://grupoaltavista.com.uy/storage/pages/727ce679412dfa88caaa8ea1a27d401c.jpg",
          "tags": [
            "Lentes de contacto",
            "Bi-Oh",
            "LC-MFPLUS",
            "Colección nueva"
          ],
          "category": "Lentes de contacto"
        },
        {
          "name": "Pack Reposición Contacto 6u",
          "description": "Optimum lentes de contacto con diseño actual, alto confort y asesoramiento personalizado en sucursal.",
          "image": "https://grupoaltavista.com.uy/storage/pages/d19e9a4255f7cc797b9bd785968fb0dc.jpg",
          "tags": [
            "Lentes de contacto",
            "Optimum",
            "PK-6U",
            "Más consultados"
          ],
          "category": "Lentes de contacto"
        },
        {
          "name": "Solución Premium 360ml",
          "description": "Avizor lentes de contacto con diseño actual, alto confort y asesoramiento personalizado en sucursal.",
          "image": "https://grupoaltavista.com.uy/storage/pages/1721eb9ee064106cd66c5993dedc1ea3.jpg",
          "tags": [
            "Lentes de contacto",
            "Avizor",
            "SOL-360",
            "Colección nueva"
          ],
          "category": "Lentes de contacto"
        },
        {
          "name": "Arnette Sol AN4260",
          "description": "Modelo solar deportivo con líneas actuales, cobertura cómoda y una presencia fuerte para todos los días.",
          "image": "https://grupoaltavista.com.uy/storage/products/thumbnails/an417825936q.jpg",
          "tags": [
            "Sol",
            "Arnette",
            "AN4260",
            "Más consultados"
          ],
          "category": "Sol"
        },
        {
          "name": "Giorgio Armani Sol AR6021",
          "description": "Diseño solar refinado con perfil premium y terminación elegante para una imagen más sobria.",
          "image": "https://grupoaltavista.com.uy/storage/products/thumbnails/ax2023s60886g.jpg",
          "tags": [
            "Sol",
            "Giorgio Armani",
            "AR6021",
            "Colección nueva"
          ],
          "category": "Sol"
        },
        {
          "name": "Giorgio Armani Sol AR8038",
          "description": "Armazón solar de aire moderno y terminación liviana para quienes buscan elegancia y confort.",
          "image": "https://grupoaltavista.com.uy/storage/products/thumbnails/ax2023s606355.jpg",
          "tags": [
            "Sol",
            "Giorgio Armani",
            "AR8038",
            "Más consultados"
          ],
          "category": "Sol"
        },
        {
          "name": "Armani Exchange Sol AX2012",
          "description": "Modelo urbano con frente liviano y look actual, pensado para combinar estilo y uso diario.",
          "image": "https://grupoaltavista.com.uy/storage/products/thumbnails/ax2023s60886g.jpg",
          "tags": [
            "Sol",
            "Armani Exchange",
            "AX2012",
            "Colección nueva"
          ],
          "category": "Sol"
        },
        {
          "name": "Vogue Sol VO5582S",
          "description": "Línea solar femenina con presencia moderna, color destacado y calce cómodo.",
          "image": "assets/product-01.svg",
          "tags": [
            "Sol",
            "Vogue",
            "VO5582S",
            "Más consultados"
          ],
          "category": "Sol"
        },
        {
          "name": "Vogue Sol VO5556S",
          "description": "Opción solar de inspiración fashion con diseño envolvente y buena presencia en rostro.",
          "image": "assets/product-02.svg",
          "tags": [
            "Sol",
            "Vogue",
            "VO5556S",
            "Colección nueva"
          ],
          "category": "Sol"
        },
        {
          "name": "Ralph Sol RA4140",
          "description": "Modelo solar liviano, elegante y versátil para quienes buscan una línea clásica actualizada.",
          "image": "assets/product-03.svg",
          "tags": [
            "Sol",
            "Ralph",
            "RA4140",
            "Más consultados"
          ],
          "category": "Sol"
        },
        {
          "name": "Ray-Ban Sol RB3025",
          "description": "Referencia icónica con lectura moderna, ideal para sumar personalidad y protección diaria.",
          "image": "https://grupoaltavista.com.uy/storage/products/thumbnails/an416120886g.jpg",
          "tags": [
            "Sol",
            "Ray-Ban",
            "RB3025",
            "Más consultados"
          ],
          "category": "Sol"
        },
        {
          "name": "Polar Sol K611",
          "description": "Modelo solar flexible con variantes de color y una propuesta cómoda para uso intensivo.",
          "image": "https://grupoaltavista.com.uy/storage/products/thumbnails/k60719.JPG",
          "tags": [
            "Sol",
            "Polar",
            "K611",
            "Colección nueva"
          ],
          "category": "Sol"
        },
        {
          "name": "Polar Sol K629",
          "description": "Diseño solar de espíritu joven, con buen calce y perfil versátil para distintos estilos.",
          "image": "https://grupoaltavista.com.uy/storage/products/thumbnails/k60708.JPG",
          "tags": [
            "Sol",
            "Polar",
            "K629",
            "Más consultados"
          ],
          "category": "Sol"
        },
        {
          "name": "Equis Sol EQS402",
          "description": "Armazón solar liviano con impronta urbana y combinación de colores consultable por sucursal.",
          "image": "assets/product-02.svg",
          "tags": [
            "Sol",
            "Equis",
            "EQS402",
            "Colección nueva"
          ],
          "category": "Sol"
        },
        {
          "name": "Carrera Sol CA301S",
          "description": "Modelo solar de frente marcado y estilo decidido, pensado para quienes priorizan presencia.",
          "image": "assets/product-03.svg",
          "tags": [
            "Sol",
            "Carrera",
            "CA301S",
            "Más consultados"
          ],
          "category": "Sol"
        },
        {
          "name": "Karün Sol KRU100",
          "description": "Alternativa solar con diseño contemporáneo, terminación cuidada y estética sustentable.",
          "image": "assets/product-01.svg",
          "tags": [
            "Sol",
            "Karün",
            "KRU100",
            "Colección nueva"
          ],
          "category": "Sol"
        },
        {
          "name": "Arnette Receta AN6001",
          "description": "Armazón de receta liviano y moderno para jornada completa, estudio o trabajo.",
          "image": "https://grupoaltavista.com.uy/storage/products/thumbnails/an60055805216.jpg",
          "tags": [
            "Receta",
            "Arnette",
            "AN6001",
            "Más consultados"
          ],
          "category": "Receta"
        },
        {
          "name": "Arnette Receta AN6017",
          "description": "Propuesta óptica de líneas limpias y calce cómodo para uso diario prolongado.",
          "image": "https://grupoaltavista.com.uy/storage/products/thumbnails/an60055805216.jpg",
          "tags": [
            "Receta",
            "Arnette",
            "AN6017",
            "Colección nueva"
          ],
          "category": "Receta"
        },
        {
          "name": "Arnette Receta AN7146",
          "description": "Diseño óptico con espíritu actual, pensado para quienes buscan una montura funcional y joven.",
          "image": "https://grupoaltavista.com.uy/storage/products/thumbnails/an71642375.jpg",
          "tags": [
            "Receta",
            "Arnette",
            "AN7146",
            "Más consultados"
          ],
          "category": "Receta"
        },
        {
          "name": "Arnette Receta AN7147",
          "description": "Armazón cómodo con presencia urbana y terminación versátil para distintos rostros.",
          "image": "https://grupoaltavista.com.uy/storage/products/thumbnails/an71642375.jpg",
          "tags": [
            "Receta",
            "Arnette",
            "AN7147",
            "Colección nueva"
          ],
          "category": "Receta"
        },
        {
          "name": "Arnette Receta AN7148",
          "description": "Montura óptica de estilo relajado con buen equilibrio entre ligereza y presencia.",
          "image": "https://grupoaltavista.com.uy/storage/products/thumbnails/an71642375.jpg",
          "tags": [
            "Receta",
            "Arnette",
            "AN7148",
            "Más consultados"
          ],
          "category": "Receta"
        },
        {
          "name": "Arnette Receta AN7158",
          "description": "Referencia óptica moderna para uso intensivo, con líneas simples y cómodas.",
          "image": "https://grupoaltavista.com.uy/storage/products/thumbnails/an71642375.jpg",
          "tags": [
            "Receta",
            "Arnette",
            "AN7158",
            "Colección nueva"
          ],
          "category": "Receta"
        },
        {
          "name": "Vogue Receta VO5654",
          "description": "Modelo óptico con inspiración fashion, colores de armazón variados y muy buena presencia.",
          "image": "assets/product-04.svg",
          "tags": [
            "Receta",
            "Vogue",
            "VO5654",
            "Colección nueva"
          ],
          "category": "Receta"
        },
        {
          "name": "Equis Receta EQ121",
          "description": "Armazón de receta con frente liviano y variantes de color para consultas por sucursal.",
          "image": "assets/product-05.svg",
          "tags": [
            "Receta",
            "Equis",
            "EQ121",
            "Más consultados"
          ],
          "category": "Receta"
        },
        {
          "name": "Ralph Receta RA7182U",
          "description": "Opción óptica elegante en acetato, con líneas definidas y una lectura más sofisticada.",
          "image": "assets/product-06.svg",
          "tags": [
            "Receta",
            "Ralph",
            "RA7182U",
            "Colección nueva"
          ],
          "category": "Receta"
        },
        {
          "name": "Ray-Ban Receta RX7140",
          "description": "Montura de receta con impronta clásica y adaptación cómoda para uso cotidiano.",
          "image": "https://grupoaltavista.com.uy/storage/products/thumbnails/rx7047594354.jpg",
          "tags": [
            "Receta",
            "Ray-Ban",
            "RX7140",
            "Más consultados"
          ],
          "category": "Receta"
        },
        {
          "name": "Ray-Ban Receta RX6448",
          "description": "Modelo metálico de receta con perfil fino y una estética atemporal que sigue funcionando muy bien.",
          "image": "https://grupoaltavista.com.uy/storage/products/thumbnails/rx7047810054.jpg",
          "tags": [
            "Receta",
            "Ray-Ban",
            "RX6448",
            "Colección nueva"
          ],
          "category": "Receta"
        },
        {
          "name": "Vogue Receta VO5426",
          "description": "Diseño óptico femenino con líneas suaves, buena liviandad y colores consultables por WhatsApp.",
          "image": "assets/product-04.svg",
          "tags": [
            "Receta",
            "Vogue",
            "VO5426",
            "Más consultados"
          ],
          "category": "Receta"
        },
        {
          "name": "Oakley Receta OX3217",
          "description": "Armazón técnico con impronta deportiva y comodidad para uso prolongado.",
          "image": "assets/product-05.svg",
          "tags": [
            "Receta",
            "Oakley",
            "OX3217",
            "Colección nueva"
          ],
          "category": "Receta"
        },
        {
          "name": "Cristales BlueCut 1.56",
          "description": "Tratamiento pensado para pantallas y rutina digital, con buena relación entre liviandad y protección.",
          "image": "assets/product-04.svg",
          "tags": [
            "Cristales",
            "BlueCut",
            "BC-156",
            "Más consultados"
          ],
          "category": "Cristales"
        },
        {
          "name": "Cristales BlueCut 1.60",
          "description": "Versión refinada para graduaciones medias, con tratamiento azul y mejor terminación estética.",
          "image": "assets/product-05.svg",
          "tags": [
            "Cristales",
            "BlueCut",
            "BC-160",
            "Colección nueva"
          ],
          "category": "Cristales"
        },
        {
          "name": "Cristales Fotocromáticos Gray",
          "description": "Opciones que se adaptan a la luz exterior para sumar confort y practicidad en movimiento.",
          "image": "assets/product-06.svg",
          "tags": [
            "Cristales",
            "Fotocromáticos",
            "PHOTO-GRAY",
            "Más consultados"
          ],
          "category": "Cristales"
        },
        {
          "name": "Cristales Fotocromáticos Brown",
          "description": "Terminación cálida para exteriores, ideal para quienes buscan versatilidad en un mismo cristal.",
          "image": "assets/product-04.svg",
          "tags": [
            "Cristales",
            "Fotocromáticos",
            "PHOTO-BROWN",
            "Colección nueva"
          ],
          "category": "Cristales"
        },
        {
          "name": "Cristales Transitions Signature",
          "description": "Alternativa premium de adaptación lumínica con enfoque en confort, estética y rendimiento diario.",
          "image": "assets/product-05.svg",
          "tags": [
            "Cristales",
            "Transitions",
            "TR-SIGN",
            "Más consultados"
          ],
          "category": "Cristales"
        },
        {
          "name": "Cristales Antifatiga Office",
          "description": "Pensados para lectura, oficina y pantallas, mejorando la experiencia en distancias cortas e intermedias.",
          "image": "assets/product-06.svg",
          "tags": [
            "Cristales",
            "Office",
            "AF-OFF",
            "Colección nueva"
          ],
          "category": "Cristales"
        },
        {
          "name": "Cristales Progresivos HD",
          "description": "Diseño progresivo de alta definición para una transición más natural entre distintas distancias.",
          "image": "assets/product-04.svg",
          "tags": [
            "Cristales",
            "Progresivos",
            "PHD-01",
            "Más consultados"
          ],
          "category": "Cristales"
        },
        {
          "name": "Cristales Polarizados Graduados",
          "description": "Combinan corrección visual y reducción de reflejos para manejo, exterior y mayor confort.",
          "image": "assets/product-05.svg",
          "tags": [
            "Cristales",
            "Polarizados",
            "POL-GRAD",
            "Colección nueva"
          ],
          "category": "Cristales"
        },
        {
          "name": "Optimum Daily Plus 30u",
          "description": "Lentes de contacto diarios pensados para reposición simple, confort y uso ágil durante la semana.",
          "image": "https://grupoaltavista.com.uy/storage/pages/d19e9a4255f7cc797b9bd785968fb0dc.jpg",
          "tags": [
            "Lentes de contacto",
            "Optimum",
            "ODP-30",
            "Más consultados"
          ],
          "category": "Lentes de contacto"
        },
        {
          "name": "Optimum Mensual Toric 3u",
          "description": "Reposición mensual para astigmatismo con asesoramiento de curva, graduación y disponibilidad.",
          "image": "https://grupoaltavista.com.uy/storage/pages/d19e9a4255f7cc797b9bd785968fb0dc.jpg",
          "tags": [
            "Lentes de contacto",
            "Optimum",
            "OMT-3",
            "Colección nueva"
          ],
          "category": "Lentes de contacto"
        },
        {
          "name": "Alcon Total30",
          "description": "Opción mensual premium con foco en hidratación sostenida y confort durante largas jornadas.",
          "image": "https://grupoaltavista.com.uy/storage/pages/ef70f9265fa47dabc1be988c662359d2.jpg",
          "tags": [
            "Lentes de contacto",
            "Alcon",
            "TOTAL30",
            "Más consultados"
          ],
          "category": "Lentes de contacto"
        },
        {
          "name": "Air Optix HydraGlyde",
          "description": "Lentes mensuales con buen equilibrio entre oxigenación y comodidad para uso diario.",
          "image": "https://grupoaltavista.com.uy/storage/pages/ef70f9265fa47dabc1be988c662359d2.jpg",
          "tags": [
            "Lentes de contacto",
            "Alcon",
            "AOHG",
            "Colección nueva"
          ],
          "category": "Lentes de contacto"
        },
        {
          "name": "Dailies AquaComfort Plus",
          "description": "Alternativa diaria de uso práctico, ideal para quienes priorizan reposición simple y frescura.",
          "image": "https://grupoaltavista.com.uy/storage/pages/ef70f9265fa47dabc1be988c662359d2.jpg",
          "tags": [
            "Lentes de contacto",
            "Alcon",
            "DACP",
            "Más consultados"
          ],
          "category": "Lentes de contacto"
        },
        {
          "name": "FreshLook Colorblends",
          "description": "Lentes de contacto cosméticos con variantes de color para consulta según disponibilidad.",
          "image": "https://grupoaltavista.com.uy/storage/pages/727ce679412dfa88caaa8ea1a27d401c.jpg",
          "tags": [
            "Lentes de contacto",
            "Bi-Oh",
            "FLCB",
            "Colección nueva"
          ],
          "category": "Lentes de contacto"
        },
        {
          "name": "Avizor Saline 350ml",
          "description": "Solución de mantenimiento y enjuague para complementar la rutina diaria de lentes blandas.",
          "image": "https://grupoaltavista.com.uy/storage/pages/1721eb9ee064106cd66c5993dedc1ea3.jpg",
          "tags": [
            "Lentes de contacto",
            "Avizor",
            "SAL-350",
            "Más consultados"
          ],
          "category": "Lentes de contacto"
        },
        {
          "name": "Biotrue Multi-Purpose 300ml",
          "description": "Solución multipropósito para limpieza, conservación y comodidad en lentes de contacto blandas.",
          "image": "https://grupoaltavista.com.uy/storage/pages/1721eb9ee064106cd66c5993dedc1ea3.jpg",
          "tags": [
            "Lentes de contacto",
            "Avizor",
            "BIO-300",
            "Colección nueva"
          ],
          "category": "Lentes de contacto"
        },
        {
          "name": "Armani Exchange Sol AX2034S",
          "description": "Modelo solar contemporáneo con frente urbano y lectura limpia para uso diario.",
          "image": "https://grupoaltavista.com.uy/storage/products/thumbnails/ax2023s60886g.jpg",
          "tags": [
            "Sol",
            "Armani Exchange",
            "AX2034S",
            "Más consultados"
          ],
          "category": "Sol"
        },
        {
          "name": "Vogue Sol VO4199S",
          "description": "Lente solar de perfil fashion con calce cómodo y una presencia actual.",
          "image": "https://grupoaltavista.com.uy/storage/products/thumbnails/an416120886g.jpg",
          "tags": [
            "Sol",
            "Vogue",
            "VO4199S",
            "Colección nueva"
          ],
          "category": "Sol"
        },
        {
          "name": "Ralph Sol RA5305U",
          "description": "Propuesta solar elegante con líneas definidas y terminación versátil.",
          "image": "https://grupoaltavista.com.uy/storage/products/thumbnails/an417825936q.jpg",
          "tags": [
            "Sol",
            "Ralph",
            "RA5305U",
            "Más consultados"
          ],
          "category": "Sol"
        },
        {
          "name": "Ray-Ban Sol RB3447",
          "description": "Diseño solar icónico de aire redondo para quienes buscan una referencia reconocible.",
          "image": "https://grupoaltavista.com.uy/storage/products/thumbnails/an416120886g.jpg",
          "tags": [
            "Sol",
            "Ray-Ban",
            "RB3447",
            "Colección nueva"
          ],
          "category": "Sol"
        },
        {
          "name": "Oakley Sol OO9102",
          "description": "Modelo solar deportivo con muy buen calce para actividad y uso intenso.",
          "image": "https://grupoaltavista.com.uy/storage/products/thumbnails/k60777.JPG",
          "tags": [
            "Sol",
            "Oakley",
            "OO9102",
            "Más consultados"
          ],
          "category": "Sol"
        },
        {
          "name": "Vogue Receta VO5432",
          "description": "Armazón óptico femenino con buena liviandad, color y presencia en rostro.",
          "image": "https://grupoaltavista.com.uy/storage/products/thumbnails/rx7047594354.jpg",
          "tags": [
            "Receta",
            "Vogue",
            "VO5432",
            "Colección nueva"
          ],
          "category": "Receta"
        },
        {
          "name": "Ralph Receta RA7155U",
          "description": "Montura óptica en acetato con una lectura clásica actualizada y muy cómoda.",
          "image": "https://grupoaltavista.com.uy/storage/products/thumbnails/rx7047810054.jpg",
          "tags": [
            "Receta",
            "Ralph",
            "RA7155U",
            "Más consultados"
          ],
          "category": "Receta"
        },
        {
          "name": "Equis Receta EQ135",
          "description": "Diseño óptico versátil para uso diario con variantes de color consultables.",
          "image": "https://grupoaltavista.com.uy/storage/products/thumbnails/an60055805216.jpg",
          "tags": [
            "Receta",
            "Equis",
            "EQ135",
            "Colección nueva"
          ],
          "category": "Receta"
        },
        {
          "name": "Ray-Ban Receta RX7228",
          "description": "Armazón moderno de receta con estructura cómoda y estética reconocible.",
          "image": "https://grupoaltavista.com.uy/storage/products/thumbnails/rx7047201254.jpg",
          "tags": [
            "Receta",
            "Ray-Ban",
            "RX7228",
            "Más consultados"
          ],
          "category": "Receta"
        },
        {
          "name": "Arnette Receta AN7189",
          "description": "Montura joven para jornada completa con impronta urbana y buena adaptación.",
          "image": "https://grupoaltavista.com.uy/storage/products/thumbnails/an71642375.jpg",
          "tags": [
            "Receta",
            "Arnette",
            "AN7189",
            "Colección nueva"
          ],
          "category": "Receta"
        },
        {
          "name": "Cristales Drive Polar Night",
          "description": "Alternativa pensada para manejo prolongado y reducción de reflejos en ruta.",
          "image": "assets/product-06.svg",
          "tags": [
            "Cristales",
            "Drive",
            "DRIVE-PN",
            "Más consultados"
          ],
          "category": "Cristales"
        },
        {
          "name": "Cristales FreeForm Premium",
          "description": "Diseño digital más preciso para mejorar adaptación, nitidez y confort.",
          "image": "assets/product-04.svg",
          "tags": [
            "Cristales",
            "FreeForm",
            "FF-PREM",
            "Colección nueva"
          ],
          "category": "Cristales"
        },
        {
          "name": "Cristales Office Reader Plus",
          "description": "Pensados para escritorio, lectura y pantallas con transición cómoda en interior.",
          "image": "assets/product-05.svg",
          "tags": [
            "Cristales",
            "Office",
            "OR-PLUS",
            "Más consultados"
          ],
          "category": "Cristales"
        },
        {
          "name": "Cristales Sport Curva Base 8",
          "description": "Configuración de alto impacto para marcos deportivos y actividad exterior.",
          "image": "assets/product-06.svg",
          "tags": [
            "Cristales",
            "Sport",
            "CB8-SPORT",
            "Colección nueva"
          ],
          "category": "Cristales"
        },
        {
          "name": "Air Optix Plus HydraGlyde Toric",
          "description": "Versión tórica mensual para astigmatismo con confort sostenido y buena estabilidad.",
          "image": "https://grupoaltavista.com.uy/storage/pages/ef70f9265fa47dabc1be988c662359d2.jpg",
          "tags": [
            "Lentes de contacto",
            "Alcon",
            "AOHG-T",
            "Más consultados"
          ],
          "category": "Lentes de contacto"
        },
        {
          "name": "Air Optix Plus HydraGlyde Multifocal",
          "description": "Alternativa multifocal mensual para visión versátil con muy buena humectación.",
          "image": "https://grupoaltavista.com.uy/storage/pages/ef70f9265fa47dabc1be988c662359d2.jpg",
          "tags": [
            "Lentes de contacto",
            "Alcon",
            "AOHG-MF",
            "Colección nueva"
          ],
          "category": "Lentes de contacto"
        },
        {
          "name": "FreshLook Colors",
          "description": "Lentes cosméticos de color con o sin graduación para cambio sutil o marcado.",
          "image": "https://grupoaltavista.com.uy/storage/pages/ef70f9265fa47dabc1be988c662359d2.jpg",
          "tags": [
            "Lentes de contacto",
            "Alcon",
            "FLC-CLR",
            "Más consultados"
          ],
          "category": "Lentes de contacto"
        },
        {
          "name": "Opti-Free PureMoist 300ml",
          "description": "Solución multiacción para limpieza diaria, desinfección e hidratación prolongada.",
          "image": "https://grupoaltavista.com.uy/storage/pages/ef70f9265fa47dabc1be988c662359d2.jpg",
          "tags": [
            "Lentes de contacto",
            "Alcon",
            "OF-PM300",
            "Colección nueva"
          ],
          "category": "Lentes de contacto"
        },
        {
          "name": "AoSept Plus HydraGlyde 360ml",
          "description": "Sistema de peróxido sin conservantes recomendado para usuarios sensibles.",
          "image": "https://grupoaltavista.com.uy/storage/pages/ef70f9265fa47dabc1be988c662359d2.jpg",
          "tags": [
            "Lentes de contacto",
            "Alcon",
            "AOSEPT-360",
            "Más consultados"
          ],
          "category": "Lentes de contacto"
        },
        {
          "name": "Avizor Alvera 350ml",
          "description": "Solución multipropósito con aloe vera para mejorar humectación y confort ocular.",
          "image": "https://grupoaltavista.com.uy/storage/pages/1721eb9ee064106cd66c5993dedc1ea3.jpg",
          "tags": [
            "Lentes de contacto",
            "Avizor",
            "ALV-350",
            "Colección nueva"
          ],
          "category": "Lentes de contacto"
        },
        {
          "name": "Avizor Unica Sensitive 350ml",
          "description": "Solución multipropósito para ojos sensibles con extra confort y lubricación.",
          "image": "https://grupoaltavista.com.uy/storage/pages/1721eb9ee064106cd66c5993dedc1ea3.jpg",
          "tags": [
            "Lentes de contacto",
            "Avizor",
            "UNI-SEN",
            "Más consultados"
          ],
          "category": "Lentes de contacto"
        },
        {
          "name": "Carrera Sol CA8046S",
          "description": "Frente solar marcado con espíritu deportivo y una presencia muy comercial en vidriera.",
          "image": "https://grupoaltavista.com.uy/storage/products/thumbnails/k60719.JPG",
          "tags": [
            "Sol",
            "Carrera",
            "CA8046S",
            "Más consultados"
          ],
          "category": "Sol"
        },
        {
          "name": "Oakley Sol OO9367",
          "description": "Modelo solar técnico para uso intenso, muy cómodo y con impronta deportiva actual.",
          "image": "https://grupoaltavista.com.uy/storage/products/thumbnails/k60777.JPG",
          "tags": [
            "Sol",
            "Oakley",
            "OO9367",
            "Colección nueva"
          ],
          "category": "Sol"
        },
        {
          "name": "Karün Sol KRU220",
          "description": "Diseño solar contemporáneo con lectura premium y buena adaptación en uso diario.",
          "image": "https://grupoaltavista.com.uy/storage/products/thumbnails/an417825936q.jpg",
          "tags": [
            "Sol",
            "Karün",
            "KRU220",
            "Más consultados"
          ],
          "category": "Sol"
        },
        {
          "name": "Arnette Sol AN4302",
          "description": "Armazón solar joven con buena cobertura y estilo urbano para todos los días.",
          "image": "https://grupoaltavista.com.uy/storage/products/thumbnails/an41782594n0.jpg",
          "tags": [
            "Sol",
            "Arnette",
            "AN4302",
            "Colección nueva"
          ],
          "category": "Sol"
        },
        {
          "name": "Vogue Sol VO5338S",
          "description": "Línea solar femenina con calce amable y estética muy vigente en salón.",
          "image": "https://grupoaltavista.com.uy/storage/products/thumbnails/an416120886g.jpg",
          "tags": [
            "Sol",
            "Vogue",
            "VO5338S",
            "Más consultados"
          ],
          "category": "Sol"
        },
        {
          "name": "Ray-Ban Sol RB2132",
          "description": "Referencia solar muy buscada con presencia clásica y lectura moderna a la vez.",
          "image": "https://grupoaltavista.com.uy/storage/products/thumbnails/an416120886g.jpg",
          "tags": [
            "Sol",
            "Ray-Ban",
            "RB2132",
            "Colección nueva"
          ],
          "category": "Sol"
        },
        {
          "name": "Oakley Receta OX8046",
          "description": "Montura óptica liviana con perfil técnico y muy buena respuesta para uso intensivo.",
          "image": "https://grupoaltavista.com.uy/storage/products/thumbnails/rx7047594354.jpg",
          "tags": [
            "Receta",
            "Oakley",
            "OX8046",
            "Más consultados"
          ],
          "category": "Receta"
        },
        {
          "name": "Vogue Receta VO5484",
          "description": "Diseño óptico de aire fashion con buena presencia y variantes de color consultables.",
          "image": "https://grupoaltavista.com.uy/storage/products/thumbnails/rx7047810054.jpg",
          "tags": [
            "Receta",
            "Vogue",
            "VO5484",
            "Colección nueva"
          ],
          "category": "Receta"
        },
        {
          "name": "Ralph Receta RA7168",
          "description": "Armazón de receta elegante en acetato, cómodo y con lectura comercial sobria.",
          "image": "https://grupoaltavista.com.uy/storage/products/thumbnails/rx7047201254.jpg",
          "tags": [
            "Receta",
            "Ralph",
            "RA7168",
            "Más consultados"
          ],
          "category": "Receta"
        },
        {
          "name": "Arnette Receta AN7194",
          "description": "Opción joven para receta con buen calce y una estética urbana fácil de vender.",
          "image": "https://grupoaltavista.com.uy/storage/products/thumbnails/an71642375.jpg",
          "tags": [
            "Receta",
            "Arnette",
            "AN7194",
            "Colección nueva"
          ],
          "category": "Receta"
        },
        {
          "name": "Ray-Ban Receta RX8903",
          "description": "Montura liviana de receta con imagen reconocible y estructura cómoda para jornada completa.",
          "image": "https://grupoaltavista.com.uy/storage/products/thumbnails/rx7047594354.jpg",
          "tags": [
            "Receta",
            "Ray-Ban",
            "RX8903",
            "Más consultados"
          ],
          "category": "Receta"
        },
        {
          "name": "Cristales Antirreflejo UltraClear",
          "description": "Tratamiento premium para mejorar transparencia, limpieza y confort visual diario.",
          "image": "assets/product-04.svg",
          "tags": [
            "Cristales",
            "Antirreflejo",
            "UCLEAR",
            "Más consultados"
          ],
          "category": "Cristales"
        },
        {
          "name": "Cristales BlueGuard Digital",
          "description": "Pensados para exposición intensiva a pantallas con terminación estética muy equilibrada.",
          "image": "assets/product-05.svg",
          "tags": [
            "Cristales",
            "BlueGuard",
            "BG-DIG",
            "Colección nueva"
          ],
          "category": "Cristales"
        },
        {
          "name": "Cristales Progresivos Comfort Fit",
          "description": "Diseño progresivo orientado a adaptación simple y lectura natural entre distancias.",
          "image": "assets/product-06.svg",
          "tags": [
            "Cristales",
            "Progresivos",
            "CF-PRO",
            "Más consultados"
          ],
          "category": "Cristales"
        },
        {
          "name": "Cristales Sun Adaptive",
          "description": "Cristales que acompañan cambios de luz exterior con buen confort y practicidad.",
          "image": "assets/product-04.svg",
          "tags": [
            "Cristales",
            "Fotocromáticos",
            "SUN-ADP",
            "Colección nueva"
          ],
          "category": "Cristales"
        },
        {
          "name": "Optimum Mensual Esférico 6u",
          "description": "Reposición mensual con buena oxigenación y una relación calidad-precio muy competitiva.",
          "image": "https://grupoaltavista.com.uy/storage/pages/d19e9a4255f7cc797b9bd785968fb0dc.jpg",
          "tags": [
            "Lentes de contacto",
            "Optimum",
            "OME-6",
            "Más consultados"
          ],
          "category": "Lentes de contacto"
        },
        {
          "name": "Optimum Multifocal Mensual",
          "description": "Opción mensual multifocal con enfoque en comodidad y claridad para distintas distancias.",
          "image": "https://grupoaltavista.com.uy/storage/pages/d19e9a4255f7cc797b9bd785968fb0dc.jpg",
          "tags": [
            "Lentes de contacto",
            "Optimum",
            "OM-MF",
            "Colección nueva"
          ],
          "category": "Lentes de contacto"
        },
        {
          "name": "FreshLook One-Day",
          "description": "Lentes cosméticos diarios para cambio de look con recambio práctico y ágil.",
          "image": "https://grupoaltavista.com.uy/storage/pages/ef70f9265fa47dabc1be988c662359d2.jpg",
          "tags": [
            "Lentes de contacto",
            "Alcon",
            "FLOD",
            "Más consultados"
          ],
          "category": "Lentes de contacto"
        },
        {
          "name": "Opti-Free Express 355ml",
          "description": "Solución multipropósito para limpieza, desinfección y conservación diaria.",
          "image": "https://grupoaltavista.com.uy/storage/pages/ef70f9265fa47dabc1be988c662359d2.jpg",
          "tags": [
            "Lentes de contacto",
            "Alcon",
            "OF-EXP",
            "Colección nueva"
          ],
          "category": "Lentes de contacto"
        },
        {
          "name": "Avizor Lacrifresh Moisture",
          "description": "Gotas humectantes compatibles con lentes de contacto para sequedad y cansancio ocular.",
          "image": "https://grupoaltavista.com.uy/storage/pages/1721eb9ee064106cd66c5993dedc1ea3.jpg",
          "tags": [
            "Lentes de contacto",
            "Avizor",
            "LAC-MO",
            "Más consultados"
          ],
          "category": "Lentes de contacto"
        },
        {
          "name": "Bi-Oh Limpiador Biotecnológico",
          "description": "Limpieza segura para lentes, armazones, pantallas y superficies ópticas sin enjuague.",
          "image": "https://grupoaltavista.com.uy/storage/pages/727ce679412dfa88caaa8ea1a27d401c.jpg",
          "tags": [
            "Lentes de contacto",
            "Bi-Oh",
            "BIO-CLEAN",
            "Colección nueva"
          ],
          "category": "Lentes de contacto"
        }
      ],
    benefits: [
      "Lentes de calidad premium",
      "Diseños modernos y actuales",
      "Opciones en cristales y lentes de contacto",
      "Atención personalizada"
    ],
    testimonials: [
      {
        name: "María S.",
        review: "Excelente atención y modelos muy lindos. Me ayudaron a elegir por WhatsApp y fue rapidísimo."
      },
      {
        name: "Joaquín R.",
        review: "La calidad se nota desde el primer momento. Muy buenos materiales y diseño moderno."
      },
      {
        name: "Lucía P.",
        review: "Consulté por cristales y me orientaron muy bien. El proceso fue simple y muy claro."
      }
    ],
    socialHighlights: [
      {
        title: "Facebook de la óptica",
        text: "Optica del Rey, Mercedes (Uruguay). Presencia activa para mostrar novedades y contacto local.",
        badge: "Facebook",
        image: "https://scontent.fmvd2-1.fna.fbcdn.net/v/t39.30808-1/301482738_470975505043822_1216383544879970921_n.jpg?stp=dst-jpg_tt6&cstp=mx690x690&ctp=s690x690&_nc_cat=107&ccb=1-7&_nc_sid=3ab345&_nc_ohc=bj9RUwdJ4SkQ7kNvwFGHOcO&_nc_oc=Adrpqylv3YvcP3YTq_eOsNpp91kro75HG9W0QVR_99NiRAyPiNJfJUqTfqyk7zqOlwc&_nc_zt=24&_nc_ht=scontent.fmvd2-1.fna&_nc_ss=7a389&oh=00_Af3RgEmsKuH0HEgV-IlmWRhpPmlXkk5gHMD3l3XpxeOrcw&oe=69DDB189"
      },
      {
        title: "Locales y atención",
        text: "Mostrá la experiencia real en Mercedes y Fray Bentos con fotos del mostrador, exhibición y atención al cliente.",
        badge: "Presencia local",
        image: "assets/local-interior.jpeg"
      },
      {
        title: "Nuevos ingresos",
        text: "Publicá cada modelo nuevo que llega para generar consultas rápidas desde la historia o el feed.",
        badge: "Contenido comercial",
        image: "assets/product-04.svg"
      },
      {
        title: "Recetas, cristales y sol",
        text: "Alterná publicaciones entre receta, cristales y sol para captar tanto compra funcional como compra por estilo.",
        badge: "Conversión",
        image: "assets/product-05.svg"
      },
      {
        title: "Asesoramiento cercano",
        text: "Usá el perfil para mostrar recomendaciones, tendencias y contacto directo por WhatsApp.",
        badge: "Confianza",
        image: "assets/marca-cartel.jpeg"
      }
    ]
  };

  const isPlainObject = (value) => value && typeof value === "object" && !Array.isArray(value);

  const clone = (value) => JSON.parse(JSON.stringify(value));

  const mergeDefaults = (defaults, incoming) => {
    if (Array.isArray(defaults)) {
      return Array.isArray(incoming) ? clone(incoming) : clone(defaults);
    }

    if (!isPlainObject(defaults)) {
      return incoming === undefined ? defaults : incoming;
    }

    const result = {};
    Object.keys(defaults).forEach((key) => {
      result[key] = mergeDefaults(defaults[key], incoming ? incoming[key] : undefined);
    });
    return result;
  };

  const fetchRemoteData = async () => {
    try {
      const response = await fetch(REMOTE_DATA_URL, { cache: "no-store" });
      if (!response.ok) {
        throw new Error("remote data unavailable");
      }

      const parsed = await response.json();
      return mergeDefaults(defaultSiteData, parsed);
    } catch (error) {
      return clone(defaultSiteData);
    }
  };

  const load = async () => {
    try {
      const remoteData = await fetchRemoteData();
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return clone(remoteData);
      }

      const parsed = JSON.parse(raw);
      return mergeDefaults(remoteData, parsed);
    } catch (error) {
      return clone(defaultSiteData);
    }
  };

  const save = (data) => {
    const normalized = mergeDefaults(defaultSiteData, data);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    return normalized;
  };

  const reset = () => {
    window.localStorage.removeItem(STORAGE_KEY);
    return clone(defaultSiteData);
  };

  const getAdminPassword = () => window.localStorage.getItem(ADMIN_PASSWORD_KEY) || DEFAULT_ADMIN_PASSWORD;

  const verifyAdminPassword = (password) => password === getAdminPassword();

  const setAdminPassword = (password) => {
    window.localStorage.setItem(ADMIN_PASSWORD_KEY, password);
  };

  const authorizeAdminSession = () => {
    window.sessionStorage.setItem(ADMIN_SESSION_KEY, "ok");
  };

  const clearAdminSession = () => {
    window.sessionStorage.removeItem(ADMIN_SESSION_KEY);
  };

  const hasAdminSession = () => window.sessionStorage.getItem(ADMIN_SESSION_KEY) === "ok";

  window.SiteDataStore = {
    key: STORAGE_KEY,
    remoteUrl: REMOTE_DATA_URL,
    defaults: clone(defaultSiteData),
    load,
    save,
    reset,
    clone,
    fetchRemoteData,
    getAdminPassword,
    verifyAdminPassword,
    setAdminPassword,
    authorizeAdminSession,
    clearAdminSession,
    hasAdminSession,
    defaultAdminPassword: DEFAULT_ADMIN_PASSWORD
  };
})();