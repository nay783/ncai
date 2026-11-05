import type { Localised } from "./projects";

export type Service = {
  id: string;
  title: Localised;
  summary: Localised;
  detail: Localised;
  includes: Localised<string[]>;
  /** Slugs of real portfolio work that shows this service. */
  work: string[];
};

export const services: Service[] = [
  {
    id: "websites",
    title: { en: "Website Design & Development", pt: "Design e Desenvolvimento de Websites" },
    summary: {
      en: "A website that presents your business clearly and feels like your own.",
      pt: "Um website que apresenta o seu negócio com clareza e que tem a sua identidade.",
    },
    detail: {
      en: "We design and build custom websites from the first idea to launch, so your business is easy to understand and your customers know what to do next.",
      pt: "Desenhamos e desenvolvemos websites à medida, da primeira ideia ao lançamento, para que o seu negócio seja fácil de compreender e os seus clientes saibam qual é o passo seguinte.",
    },
    includes: {
      en: ["Custom page design", "Responsive development", "Portuguese and English versions", "Search-ready structure"],
      pt: ["Design de páginas à medida", "Desenvolvimento responsivo", "Versões em português e inglês", "Estrutura preparada para motores de busca"],
    },
    work: ["fitness-365", "clinica-do-povo", "vieiras-gym"],
  },
  {
    id: "web-applications",
    title: { en: "Custom Web Applications", pt: "Aplicações Web à Medida" },
    summary: {
      en: "Applications that run in the browser and work the way your idea needs them to.",
      pt: "Aplicações que funcionam no navegador, da forma que a sua ideia exige.",
    },
    detail: {
      en: "When a template cannot do what you need, we build it. We shape guided journeys, conversations and requests into an application people can use without instructions.",
      pt: "Quando um modelo pronto não faz o que precisa, nós criamos a solução. Transformamos percursos guiados, conversas e pedidos numa aplicação que as pessoas conseguem usar sem instruções.",
    },
    includes: {
      en: ["Guided user journeys", "Location-based experiences", "Conversational interfaces", "Requests and scheduling flows"],
      pt: ["Percursos guiados", "Experiências adaptadas à localização", "Interfaces de conversa", "Fluxos de pedidos e agendamento"],
    },
    work: ["saaj-virtual-application"],
  },
  {
    id: "platforms",
    title: { en: "Digital Platforms & Software Solutions", pt: "Plataformas Digitais e Soluções de Software" },
    summary: {
      en: "Connected digital experiences that bring a whole idea or organisation together.",
      pt: "Experiências digitais ligadas entre si, que reúnem toda uma ideia ou organização.",
    },
    detail: {
      en: "Some ideas need more than one page or one tool. We plan and build the pieces so they work as a single experience, like a public website that leads to an application, or a storefront that sits beside a brand.",
      pt: "Algumas ideias precisam de mais do que uma página ou uma ferramenta. Planeamos e construímos as partes para que funcionem como uma só experiência, como um website público que conduz a uma aplicação, ou uma loja integrada numa marca.",
    },
    includes: {
      en: ["Platform planning", "Linked website and application", "Online storefronts", "Structured content"],
      pt: ["Planeamento da plataforma", "Website e aplicação interligados", "Lojas online", "Conteúdos estruturados"],
    },
    work: ["saaj-virtual-website", "saaj-virtual-application", "nura-skincare"],
  },
  {
    id: "ui-ux",
    title: { en: "UI/UX Design", pt: "Design UI/UX" },
    summary: {
      en: "Interfaces that feel obvious to use and carry the character of your brand.",
      pt: "Interfaces de utilização intuitiva, com o carácter da sua marca.",
    },
    detail: {
      en: "We work out how each person moves through your product, then design every screen for that moment. From a calm clinic to an energetic gym, the design follows the people it serves.",
      pt: "Estudamos como cada pessoa percorre o seu produto e desenhamos cada ecrã para esse momento. De uma clínica serena a um ginásio cheio de energia, o design acompanha as pessoas a quem se destina.",
    },
    includes: {
      en: ["User journeys", "Interface design", "Mobile-first layouts", "Visual direction"],
      pt: ["Percursos de utilizador", "Design de interfaces", "Layouts pensados para telemóvel", "Direcção visual"],
    },
    work: ["cda", "sugarbites-by-saaya", "clinica-da-familia"],
  },
  {
    id: "products",
    title: { en: "Digital Product Development", pt: "Desenvolvimento de Produtos Digitais" },
    summary: {
      en: "From an early idea to a working product people can open and use.",
      pt: "De uma ideia inicial a um produto funcional que as pessoas podem abrir e usar.",
    },
    detail: {
      en: "If you are starting from an idea, we help you define what to build first, design it and develop it until it is in people's hands.",
      pt: "Se está a partir de uma ideia, ajudamos a definir o que construir primeiro, a desenhá-lo e a desenvolvê-lo até chegar às mãos das pessoas.",
    },
    includes: {
      en: ["Defining the first version", "Design and development together", "Testing across screen sizes", "Launch support"],
      pt: ["Definição da primeira versão", "Design e desenvolvimento em conjunto", "Testes em vários tamanhos de ecrã", "Apoio ao lançamento"],
    },
    work: ["saaj-virtual-application", "ir-fitness"],
  },
];
