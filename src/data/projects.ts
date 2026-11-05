import type { Locale } from "@/i18n/routing";

/**
 * Portfolio source of truth. Everything here was observed on the live sites or in
 * the SAAJ Virtual materials. Do not add clients, results, dates or briefs that
 * cannot be verified. `stack` lists only what the deployed site itself reveals.
 */
export type Localised<T = string> = Record<Locale, T>;
export type CategoryId = "fitness" | "healthcare" | "commerce" | "platforms";

export type ProjectImage = { src: string; alt: Localised };

export type JourneyStep = {
  title: Localised;
  body: Localised;
  image: ProjectImage;
};

export type Project = {
  slug: string;
  name: string;
  /** Portuguese display name, when it differs from `name`. */
  namePt?: string;
  category: CategoryId;
  url: string;
  /** Order on the homepage; omit to keep the project off the homepage. */
  featuredOrder?: number;
  location?: Localised;
  stack?: string[];
  summary: Localised;
  overview: Localised<string[]>;
  features: Localised<string[]>;
  hero: ProjectImage;
  /** Desktop frames at 1920x1200. */
  gallery: ProjectImage[];
  mobile: ProjectImage;
  companionSlug?: string;
  journey?: JourneyStep[];
  note?: Localised;
};

const img = (slug: string, file: string, en: string, pt: string): ProjectImage => ({
  src: `/images/projects/${slug}/${file}.webp`,
  alt: { en, pt },
});

export const projects: Project[] = [
  {
    slug: "saaj-virtual-application",
    name: "SAAJ Virtual — Application",
    namePt: "SAAJ Virtual — Aplicação",
    category: "platforms",
    url: "https://saajvirtual.vercel.app/",
    featuredOrder: 1,
    location: { en: "Mozambique", pt: "Moçambique" },
    stack: ["Next.js", "Vercel"],
    summary: {
      en: "A digital health application where young people in Mozambique can ask sexual and reproductive health questions to two AI virtual guides.",
      pt: "Uma aplicação de saúde digital onde jovens em Moçambique podem colocar questões de saúde sexual e reprodutiva a dois guias virtuais com inteligência artificial.",
    },
    overview: {
      en: [
        "SAAJ Virtual supports adolescents and young people in Mozambique who want information about sexual and reproductive health. The application opens in the browser, works without a mandatory account, and guides each person from choosing their location to a conversation with Tonito or Manuela.",
        "Tonito and Manuela are AI virtual guides, not health professionals. They offer information and point people towards care. In Maxixe and Massinga, the application also offers voice calls and appointment requests at the local SAAJ.",
      ],
      pt: [
        "O SAAJ Virtual apoia adolescentes e jovens em Moçambique que procuram informação sobre saúde sexual e reprodutiva. A aplicação abre no navegador, funciona sem conta obrigatória e acompanha cada pessoa desde a escolha da localização até à conversa com o Tonito ou a Manuela.",
        "O Tonito e a Manuela são guias virtuais com inteligência artificial, não profissionais de saúde. Oferecem informação e orientam as pessoas para os serviços de saúde. Em Maxixe e Massinga, a aplicação oferece também chamadas de voz e pedidos de consulta no SAAJ local.",
      ],
    },
    features: {
      en: [
        "Province and district selection that adapts the services shown",
        "Choice of two AI virtual guides, each with a profile",
        "Conversation with suggested topics",
        "Voice calls in Maxixe and Massinga",
        "Appointment requests in Maxixe and Massinga",
        "Quick exit control",
        "Access without a mandatory account",
      ],
      pt: [
        "Selecção de província e distrito que adapta os serviços apresentados",
        "Escolha entre dois guias virtuais com IA, cada um com o seu perfil",
        "Conversa com temas sugeridos",
        "Chamadas de voz em Maxixe e Massinga",
        "Pedidos de consulta em Maxixe e Massinga",
        "Controlo de saída rápida",
        "Acesso sem conta obrigatória",
      ],
    },
    hero: img(
      "saaj-virtual-application",
      "overview",
      "Three phones showing the SAAJ Virtual location, guide and chat screens, as presented on the marketing website.",
      "Três telemóveis com os ecrãs de localização, guia e conversa do SAAJ Virtual, tal como apresentados no website.",
    ),
    gallery: [],
    mobile: img(
      "saaj-virtual-application",
      "guide",
      "SAAJ Virtual screen asking who the person prefers to start with, showing Tonito and Manuela.",
      "Ecrã do SAAJ Virtual a perguntar com quem a pessoa prefere começar, com o Tonito e a Manuela.",
    ),
    companionSlug: "saaj-virtual-website",
    journey: [
      {
        title: { en: "Start from where you are", pt: "Começar a partir de onde está" },
        body: {
          en: "A short location step asks for province and district, so the application can show what is available in that region.",
          pt: "Um breve passo de localização pede a província e o distrito, para que a aplicação possa mostrar o que está disponível nessa região.",
        },
        image: img(
          "saaj-virtual-application",
          "location",
          "SAAJ Virtual location screen with Inhambane and Maxixe selected.",
          "Ecrã de localização do SAAJ Virtual com Inhambane e Maxixe seleccionados.",
        ),
      },
      {
        title: { en: "Choose who to talk to", pt: "Escolher com quem falar" },
        body: {
          en: "Each person chooses Tonito or Manuela. Both are presented as virtual guides, and each has a profile before the conversation begins.",
          pt: "Cada pessoa escolhe o Tonito ou a Manuela. Ambos são apresentados como guias virtuais, e cada um tem um perfil antes de a conversa começar.",
        },
        image: img(
          "saaj-virtual-application",
          "assistants",
          "Store screenshot showing the Manuela and Tonito profile screens.",
          "Imagem de loja com os ecrãs de perfil da Manuela e do Tonito.",
        ),
      },
      {
        title: { en: "Ask, without judgement", pt: "Perguntar, sem julgamentos" },
        body: {
          en: "Suggested topics help people begin when a question is hard to put into words. The screen shown here is a demonstration, not a real conversation.",
          pt: "Os temas sugeridos ajudam a começar quando é difícil pôr uma pergunta em palavras. O ecrã apresentado é uma demonstração, não uma conversa real.",
        },
        image: img(
          "saaj-virtual-application",
          "chat",
          "Store screenshot of a demonstration chat with Manuela showing suggested topics.",
          "Imagem de loja de uma conversa de demonstração com a Manuela, com temas sugeridos.",
        ),
      },
      {
        title: { en: "Talk by voice in pilot locations", pt: "Falar por voz nas localidades-piloto" },
        body: {
          en: "In Maxixe and Massinga, people can also speak to a guide by voice call.",
          pt: "Em Maxixe e Massinga, é também possível falar com um guia por chamada de voz.",
        },
        image: img(
          "saaj-virtual-application",
          "call",
          "Store screenshot of a voice call screen with Manuela. Calls are available in Maxixe and Massinga.",
          "Imagem de loja de um ecrã de chamada com a Manuela. As chamadas estão disponíveis em Maxixe e Massinga.",
        ),
      },
      {
        title: { en: "Request an appointment", pt: "Pedir uma consulta" },
        body: {
          en: "Also in Maxixe and Massinga, people can pick a day and time to request an appointment at the local SAAJ.",
          pt: "Também em Maxixe e Massinga, é possível escolher o dia e a hora para pedir uma consulta no SAAJ local.",
        },
        image: img(
          "saaj-virtual-application",
          "booking",
          "Store screenshot of the appointment calendar. Requests are available in Maxixe and Massinga.",
          "Imagem de loja do calendário de consultas. Os pedidos estão disponíveis em Maxixe e Massinga.",
        ),
      },
    ],
    note: {
      en: "All imagery comes from public or demonstration material. No real conversations or personal data appear on this page. SAAJ Virtual does not replace health professionals or emergency services.",
      pt: "Todas as imagens provêm de material público ou de demonstração. Nenhuma conversa real ou dado pessoal aparece nesta página. O SAAJ Virtual não substitui profissionais de saúde nem serviços de emergência.",
    },
  },
  {
    slug: "saaj-virtual-website",
    name: "SAAJ Virtual — Marketing Website",
    namePt: "SAAJ Virtual — Website",
    category: "platforms",
    url: "https://saaj-virtual-site.vercel.app/",
    location: { en: "Mozambique", pt: "Moçambique" },
    stack: ["Vite", "Vercel"],
    summary: {
      en: "The public home of SAAJ Virtual: a dark, scroll-led website that introduces the guides and explains how to begin.",
      pt: "A casa pública do SAAJ Virtual: um website escuro, conduzido pelo scroll, que apresenta os guias e explica como começar.",
    },
    overview: {
      en: [
        "The marketing website speaks directly to young people. It opens on a single question, then introduces Tonito and Manuela, explains the three steps to start, and leads to the application.",
        "It also sets expectations: the guides are virtual, they do not replace health services, and the extra services available in Maxixe and Massinga are explained in their own section.",
      ],
      pt: [
        "O website fala directamente com os jovens. Abre com uma única pergunta, apresenta o Tonito e a Manuela, explica os três passos para começar e conduz à aplicação.",
        "Também esclarece expectativas: os guias são virtuais, não substituem os serviços de saúde, e os serviços adicionais de Maxixe e Massinga têm uma secção própria.",
      ],
    },
    features: {
      en: [
        "Scroll-led opening with animated imagery",
        "Interactive switch between Tonito and Manuela",
        "Interactive cards with example questions",
        "Three-step explanation with application screens",
        "Dedicated section for Maxixe and Massinga",
        "Frequently asked questions and support information",
      ],
      pt: [
        "Abertura conduzida pelo scroll, com imagens animadas",
        "Alternância interactiva entre o Tonito e a Manuela",
        "Cartões interactivos com perguntas de exemplo",
        "Explicação em três passos com ecrãs da aplicação",
        "Secção dedicada a Maxixe e Massinga",
        "Perguntas frequentes e informação de apoio",
      ],
    },
    hero: img(
      "saaj-virtual-website",
      "hero",
      "SAAJ Virtual website opening with the headline Há perguntas que tens vergonha de fazer? over a dusk scene.",
      "Abertura do website SAAJ Virtual com o título Há perguntas que tens vergonha de fazer? sobre uma cena ao anoitecer.",
    ),
    gallery: [
      img("saaj-virtual-website", "guides", "Section of the website that lets visitors switch between Tonito and Manuela.", "Secção do website que permite alternar entre o Tonito e a Manuela."),
      img("saaj-virtual-website", "steps", "Three-step explanation with phones showing the application.", "Explicação em três passos com telemóveis a mostrar a aplicação."),
      img("saaj-virtual-website", "pilot", "Section about the services available in Maxixe and Massinga.", "Secção sobre os serviços disponíveis em Maxixe e Massinga."),
    ],
    mobile: img("saaj-virtual-website", "mobile", "SAAJ Virtual website on a phone.", "Website SAAJ Virtual num telemóvel."),
    companionSlug: "saaj-virtual-application",
  },
  {
    slug: "fitness-365",
    name: "365 Fitness",
    category: "fitness",
    url: "https://365fitness.vercel.app/",
    featuredOrder: 2,
    location: { en: "Repinga, Maputo", pt: "Repinga, Maputo" },
    stack: ["Next.js", "Vercel"],
    summary: {
      en: "A high-energy gym website built around training guidance, community and clear packages.",
      pt: "Um website de ginásio cheio de energia, construído em torno da orientação de treino, da comunidade e de pacotes claros.",
    },
    overview: {
      en: ["The website for 365 Fitness in Repinga presents the gym as a way of living, not only a place to train. Visitors move from its training approach to video tips, community moments, packages and how to find the gym, in Portuguese or English."],
      pt: ["O website do 365 Fitness, em Repinga, apresenta o ginásio como uma forma de viver, e não apenas um lugar para treinar. Os visitantes passam da abordagem de treino às dicas em vídeo, aos momentos da comunidade, aos pacotes e à localização, em português ou inglês."],
    },
    features: {
      en: ["Portuguese and English versions", "Dicas 365 video tips section", "Community and events gallery", "Standard and personalised packages", "Frequently asked questions", "Location and contact details"],
      pt: ["Versões em português e inglês", "Secção de dicas em vídeo Dicas 365", "Galeria de comunidade e eventos", "Pacotes normais e personalizados", "Perguntas frequentes", "Localização e contactos"],
    },
    hero: img("fitness-365", "hero", "365 Fitness homepage with the headline O teu melhor começa aqui in white and yellow on black.", "Página inicial do 365 Fitness com o título O teu melhor começa aqui, a branco e amarelo sobre preto."),
    gallery: [
      img("fitness-365", "training", "Numbered training approach on a dark background.", "Abordagem de treino numerada sobre fundo escuro."),
      img("fitness-365", "packages", "Membership packages with prices.", "Pacotes de adesão com preços."),
    ],
    mobile: img("fitness-365", "mobile", "365 Fitness website on a phone.", "Website do 365 Fitness num telemóvel."),
  },
  {
    slug: "nura-skincare",
    name: "Nura Skincare",
    category: "commerce",
    url: "https://nura-skincare-t8te.vercel.app/",
    featuredOrder: 3,
    location: { en: "Mozambique", pt: "Moçambique" },
    stack: ["Next.js", "Vercel"],
    summary: {
      en: "A calm online storefront for Korean skincare in Mozambique, organised around each customer's skin goals.",
      pt: "Uma loja online serena para skincare coreano em Moçambique, organizada em torno dos objectivos de pele de cada cliente.",
    },
    overview: {
      en: ["Nura Skincare brings Korean skincare to customers in Mozambique. The storefront helps people shop by what they want for their skin, discover favourites and new arrivals, and learn from a skincare guide before they buy."],
      pt: ["A Nura Skincare leva o skincare coreano aos clientes em Moçambique. A loja ajuda as pessoas a comprar de acordo com o que procuram para a sua pele, a descobrir favoritos e novidades, e a aprender com um guia de skincare antes de comprar."],
    },
    features: {
      en: ["Shop by skin goal", "Product highlights and new arrivals", "Add-to-cart controls", "Skincare guide and blog", "Delivery and pick-up information", "WhatsApp contact and newsletter sign-up"],
      pt: ["Compras por objectivo de pele", "Destaques de produtos e novidades", "Botões para adicionar ao carrinho", "Guia e blog de skincare", "Informação sobre entrega e levantamento", "Contacto por WhatsApp e subscrição de newsletter"],
    },
    hero: img("nura-skincare", "hero", "Nura Skincare homepage with a serif headline beside a product photograph.", "Página inicial da Nura Skincare com título em serifa ao lado de uma fotografia de produto."),
    gallery: [
      img("nura-skincare", "goals", "Shop by skin goal grid with product photography.", "Grelha de compras por objectivo com fotografia de produto."),
      img("nura-skincare", "favourites", "Favourites section with featured products and prices.", "Secção de favoritos com produtos em destaque e preços."),
    ],
    mobile: img("nura-skincare", "mobile", "Nura Skincare website on a phone.", "Website da Nura Skincare num telemóvel."),
  },
  {
    slug: "clinica-do-povo",
    name: "Clínica do Povo",
    category: "healthcare",
    url: "https://clinic-website-redesign-lime.vercel.app/",
    featuredOrder: 4,
    location: { en: "Micadjuine, Maputo", pt: "Micadjuine, Maputo" },
    stack: ["Next.js", "Vercel"],
    summary: {
      en: "A warm, accessible website for a community clinic, with services, a solidarity fund and a direct route to booking.",
      pt: "Um website acolhedor e acessível para uma clínica comunitária, com serviços, fundo solidário e um caminho directo para a marcação.",
    },
    overview: {
      en: ["The website presents Clínica do Povo as a community clinic. Services are organised into clear groups, the Fundo Solidário explains how support reaches people in need, and appointment calls to action stay in view throughout."],
      pt: ["O website apresenta a Clínica do Povo como uma clínica comunitária. Os serviços estão organizados em grupos claros, o Fundo Solidário explica como o apoio chega a quem precisa, e os apelos à marcação de consulta mantêm-se visíveis ao longo da página."],
    },
    features: {
      en: ["Services organised into tabbed groups", "Dedicated Fundo Solidário section", "Appointment calls to action", "Community image gallery", "Opening hours and directions", "Phone numbers in the navigation"],
      pt: ["Serviços organizados em separadores", "Secção dedicada ao Fundo Solidário", "Apelos à marcação de consulta", "Galeria de imagens da comunidade", "Horário e indicações de localização", "Contactos telefónicos na navegação"],
    },
    hero: img("clinica-do-povo", "hero", "Clínica do Povo homepage with the headline Cuidar de si é a nossa missão.", "Página inicial da Clínica do Povo com o título Cuidar de si é a nossa missão."),
    gallery: [
      img("clinica-do-povo", "services", "Services section with tabs and a photograph of a clinician.", "Secção de serviços com separadores e fotografia de uma profissional de saúde."),
      img("clinica-do-povo", "community", "About section with a community photograph.", "Secção sobre a clínica com fotografia da comunidade."),
    ],
    mobile: img("clinica-do-povo", "mobile", "Clínica do Povo website on a phone.", "Website da Clínica do Povo num telemóvel."),
  },
  {
    slug: "sugarbites-by-saaya",
    name: "Sugarbites By Saaya",
    category: "commerce",
    url: "https://sugarbites-by-saaya.vercel.app/",
    featuredOrder: 5,
    location: { en: "Maputo", pt: "Maputo" },
    stack: ["Next.js", "Vercel"],
    summary: {
      en: "An indulgent storefront for a dessert atelier, with categories, best sellers and a build-your-own dessert box.",
      pt: "Uma loja requintada para um atelier de sobremesas, com categorias, os mais vendidos e uma caixa de sobremesas personalizável.",
    },
    overview: {
      en: ["Sugarbites presents handcrafted desserts with the feel of a boutique. Visitors browse by category, add best sellers quickly, or start building their own dessert box."],
      pt: ["A Sugarbites apresenta sobremesas artesanais com o ambiente de uma boutique. Os visitantes navegam por categoria, adicionam rapidamente os mais vendidos ou começam a montar a sua própria caixa de sobremesas."],
    },
    features: {
      en: ["Product categories", "Best sellers with quick add", "Build-your-own dessert box", "Behind-the-scenes video section", "Language switch", "Newsletter sign-up"],
      pt: ["Categorias de produtos", "Mais vendidos com adição rápida", "Caixa de sobremesas personalizável", "Secção de vídeos dos bastidores", "Selector de idioma", "Subscrição de newsletter"],
    },
    hero: img("sugarbites-by-saaya", "hero", "Sugarbites homepage featuring a chocolate raspberry petit gateau on a soft pink background.", "Página inicial da Sugarbites com um petit gateau de chocolate e framboesa sobre fundo rosa suave."),
    gallery: [
      img("sugarbites-by-saaya", "box", "Build your perfect dessert box section beside a cheesecake photograph.", "Secção para montar a caixa de sobremesas ao lado de uma fotografia de cheesecake."),
    ],
    mobile: img("sugarbites-by-saaya", "mobile", "Sugarbites website on a phone.", "Website da Sugarbites num telemóvel."),
  },
  {
    slug: "vieiras-gym",
    name: "Vieira's Gym",
    category: "fitness",
    url: "https://vieiras-gym-s9vp.vercel.app/",
    location: { en: "Maputo and Matola", pt: "Maputo e Matola" },
    summary: {
      en: "A disciplined, bold website for a martial arts and fitness gym, with a full class timetable.",
      pt: "Um website ousado e disciplinado para um ginásio de artes marciais e fitness, com o horário completo das aulas.",
    },
    overview: {
      en: ["The website for Vieira's Gym brings its martial arts and fitness disciplines together in one place. Visitors can choose a path, read the weekly timetable, compare packages and find the Maputo or Matola locations."],
      pt: ["O website do Vieira's Gym reúne num só lugar as suas modalidades de artes marciais e fitness. Os visitantes podem escolher um caminho, consultar o horário semanal, comparar pacotes e encontrar as localizações de Maputo e Matola."],
    },
    features: {
      en: ["Portuguese and English versions", "Weekly timetable filtered by discipline", "Discipline overview", "Package comparison", "Two locations", "Trial class calls to action"],
      pt: ["Versões em português e inglês", "Horário semanal filtrado por modalidade", "Apresentação das modalidades", "Comparação de pacotes", "Duas localizações", "Apelos à aula experimental"],
    },
    hero: img("vieiras-gym", "hero", "Vieira's Gym homepage with the headline Força física e resiliência mental.", "Página inicial do Vieira's Gym com o título Força física e resiliência mental."),
    gallery: [
      img("vieiras-gym", "schedule", "Weekly class timetable with discipline filters.", "Horário semanal das aulas com filtros por modalidade."),
      img("vieiras-gym", "pricing", "Three monthly packages side by side.", "Três pacotes mensais lado a lado."),
    ],
    mobile: img("vieiras-gym", "mobile", "Vieira's Gym website on a phone.", "Website do Vieira's Gym num telemóvel."),
  },
  {
    slug: "olympia-gym",
    name: "Olympia Gym",
    category: "fitness",
    url: "https://olympiagym-phi.vercel.app/",
    location: { en: "Polana Cimento B, Maputo", pt: "Polana Cimento B, Maputo" },
    stack: ["Next.js", "Vercel"],
    summary: {
      en: "A compact, high-contrast website for a 24-hour gym in central Maputo.",
      pt: "Um website compacto e de alto contraste para um ginásio 24 horas no centro de Maputo.",
    },
    overview: {
      en: ["The Olympia Gym website keeps everything close together: what you can train, the community behind it, transparent plans, and where to find the gym, in Portuguese or English."],
      pt: ["O website do Olympia Gym mantém tudo próximo: o que se pode treinar, a comunidade, planos transparentes e onde encontrar o ginásio, em português ou inglês."],
    },
    features: {
      en: ["Portuguese and English versions", "Training modalities", "Community video section", "Plans grouped in tabs", "Opening hours and address"],
      pt: ["Versões em português e inglês", "Modalidades de treino", "Secção de vídeos da comunidade", "Planos agrupados em separadores", "Horário e morada"],
    },
    hero: img("olympia-gym", "hero", "Olympia Gym homepage with a large red and white condensed headline.", "Página inicial do Olympia Gym com um grande título condensado a vermelho e branco."),
    gallery: [
      img("olympia-gym", "modalities", "Training modalities in a four-column grid.", "Modalidades de treino numa grelha de quatro colunas."),
      img("olympia-gym", "pricing", "Membership plans with a highlighted monthly option.", "Planos de adesão com a opção mensal em destaque."),
    ],
    mobile: img("olympia-gym", "mobile", "Olympia Gym website on a phone.", "Website do Olympia Gym num telemóvel."),
  },
  {
    slug: "ir-fitness",
    name: "IR Fitness",
    category: "fitness",
    url: "https://irfitness.vercel.app/",
    location: { en: "Maputo", pt: "Maputo" },
    stack: ["Next.js", "Vercel"],
    summary: {
      en: "One website for a whole fitness brand: gym, martial arts, supplements, events and student offers.",
      pt: "Um website para toda uma marca de fitness: ginásio, artes marciais, suplementos, eventos e condições para estudantes.",
    },
    overview: {
      en: ["IR Fitness is more than a gym, and the website reflects that. It brings the gym, its martial arts academy and its supplement shop under one identity, with sections for plans, events and students."],
      pt: ["A IR Fitness é mais do que um ginásio, e o website reflecte isso. Reúne o ginásio, a academia de artes marciais e a loja de suplementos numa só identidade, com secções para planos, eventos e estudantes."],
    },
    features: {
      en: ["Portuguese and English versions", "Tabbed brand pillars", "Grouped passes and plans", "Supplement section with video", "Event and student sections", "Store locations and direct contacts"],
      pt: ["Versões em português e inglês", "Pilares da marca em separadores", "Passes e planos agrupados", "Secção de suplementos com vídeo", "Secções de eventos e estudantes", "Lojas e contactos directos"],
    },
    hero: img("ir-fitness", "hero", "IR Fitness homepage with a red and white headline over a dark background.", "Página inicial da IR Fitness com título vermelho e branco sobre fundo escuro."),
    gallery: [
      img("ir-fitness", "pillars", "Brand pillars section with tabs.", "Secção dos pilares da marca com separadores."),
      img("ir-fitness", "shop", "Supplement section with video cards.", "Secção de suplementos com cartões de vídeo."),
    ],
    mobile: img("ir-fitness", "mobile", "IR Fitness website on a phone.", "Website da IR Fitness num telemóvel."),
  },
  {
    slug: "cda",
    name: "CDA",
    category: "healthcare",
    url: "https://preview-health-flow.lovable.app/",
    location: { en: "Maputo", pt: "Maputo" },
    summary: {
      en: "A calm, reassuring website for a diagnostic centre, with services and a health education hub.",
      pt: "Um website sereno e tranquilizador para um centro de diagnóstico, com serviços e um espaço de educação em saúde.",
    },
    overview: {
      en: ["The website for CDA, Centro de Diagnóstico Avançado, starts with a human concern: not knowing what is happening with your health. It then explains how to begin in three steps, sets out its services, and offers articles in a Health Hub."],
      pt: ["O website do CDA, Centro de Diagnóstico Avançado, começa com uma preocupação humana: não saber o que se passa com a sua saúde. Depois explica como começar em três passos, apresenta os serviços e oferece artigos num Health Hub."],
    },
    features: {
      en: ["Three-step explanation of the visit", "Service overview with imagery", "Health Hub articles with topic filters", "Frequently asked questions", "Appointment calls to action"],
      pt: ["Explicação da visita em três passos", "Apresentação dos serviços com imagens", "Artigos do Health Hub com filtros por tema", "Perguntas frequentes", "Apelos à marcação de atendimento"],
    },
    hero: img("cda", "hero", "CDA homepage with the headline Conheça a sua saúde com confiança.", "Página inicial do CDA com o título Conheça a sua saúde com confiança."),
    gallery: [
      img("cda", "services", "Clinical services with photographs.", "Serviços clínicos com fotografias."),
      img("cda", "hub", "Health Hub article grid with topic filters.", "Grelha de artigos do Health Hub com filtros por tema."),
    ],
    mobile: img("cda", "mobile", "CDA website on a phone.", "Website do CDA num telemóvel."),
  },
  {
    slug: "clinica-da-familia",
    name: "Clínica da Família",
    category: "healthcare",
    url: "https://v0-clinica-da-familia-website-tan.vercel.app/",
    location: { en: "Matola-Rio", pt: "Matola-Rio" },
    stack: ["Next.js", "Vercel"],
    summary: {
      en: "A dark, confident website for a family clinic in Matola-Rio.",
      pt: "Um website escuro e confiante para uma clínica familiar em Matola-Rio.",
    },
    overview: {
      en: ["The Clínica da Família website moves away from the usual clinical white. A photograph of the building opens the page, followed by services in obstetrics, paediatrics and general medicine, the medical team, common questions and directions."],
      pt: ["O website da Clínica da Família afasta-se do habitual branco clínico. Uma fotografia do edifício abre a página, seguida dos serviços de obstetrícia, pediatria e medicina geral, da equipa médica, das perguntas frequentes e das indicações de localização."],
    },
    features: {
      en: ["Three core services", "Medical team section", "Accordion for common questions", "Address, phone and hours", "Appointment calls to action"],
      pt: ["Três serviços principais", "Secção da equipa médica", "Perguntas frequentes em acordeão", "Morada, telefone e horário", "Apelos à marcação de consulta"],
    },
    hero: img("clinica-da-familia", "hero", "Clínica da Família homepage with a large headline over a photograph of the building.", "Página inicial da Clínica da Família com um grande título sobre uma fotografia do edifício."),
    gallery: [
      img("clinica-da-familia", "services", "Three service cards on a dark background.", "Três cartões de serviços sobre fundo escuro."),
      img("clinica-da-familia", "faq", "Frequently asked questions accordion.", "Perguntas frequentes em acordeão."),
    ],
    mobile: img("clinica-da-familia", "mobile", "Clínica da Família website on a phone.", "Website da Clínica da Família num telemóvel."),
  },
];

export const categoryIds: CategoryId[] = ["fitness", "healthcare", "commerce", "platforms"];

export const projectName = (project: Project, locale: Locale) =>
  locale === "pt" ? (project.namePt ?? project.name) : project.name;

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const featuredProjects = projects
  .filter((p) => p.featuredOrder !== undefined)
  .sort((a, b) => (a.featuredOrder ?? 0) - (b.featuredOrder ?? 0));

export function nextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length]!;
}
