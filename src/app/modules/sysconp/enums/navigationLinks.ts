// Define o tipo para os links de navegação
export interface NavigationLink {
  href: string; // URL do link
  icon?: any; // (opcional) ícone associado ao link
  label: string; // Rótulo do link
}

// Cria os links de navegação
const navigationLinks: { [key: string]: NavigationLink[] } = {
  '/welcome': [
    { href: '/welcome', label: 'Bem-vindo' },
    { href: '/appointments', label: 'Agendamentos' },
    { href: '/projects', label: 'Projectos' },
    { href: '/properties', label: 'Imóvel' },
  ],
  '/appointments': [
    { href: '/appointments', label: 'Agendamentos' },
    { href: '/reports', label: 'Relatórios' },
    { href: '/sales', label: 'Vendas' },
  ],
  '/projects': [
    { href: '/projects', label: 'Projectos' },
    { href: '/documents', label: 'Documentos' },
  ],
  '/properties': [
    { href: '/properties', label: 'Imóvel' },
    { href: '/users-management', label: 'Gestão de usuários' },
  ],
  // Adicione mais rotas conforme necessário
};

export default navigationLinks;
