import { Database, Clock, Building2, Landmark, ClipboardMinus, FileText, CirclePercent, Users } from 'lucide-react';

// Define o tipo para os dados do ícone
export interface IconData {
  Icon: any; // Pode ser um componente de ícone
  label: string; // Rótulo do ícone
  href: string; // URL para navegação
}

// Cria os dados do ícone
export const IconsData: IconData[] = [
  { Icon: Database, label: 'Dashboard', href: '/welcome' },
  { Icon: Clock, label: 'Agendamentos', href: '/appointments' },
  { Icon: Building2, label: 'Projectos', href: '/projects' },
  { Icon: Landmark, label: 'Imóvel', href: '/properties' },
  { Icon: ClipboardMinus, label: 'Relatórios', href: '/reports' },
  { Icon: FileText, label: 'Documentos', href: '/documents' },
  { Icon: CirclePercent, label: 'Vendas', href: '/sales' },
  { Icon: Users, label: 'Gestão de usuários', href: '/users-management' },
];
