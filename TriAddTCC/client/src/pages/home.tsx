import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Shield, 
  User, 
  Activity, 
  Settings, 
  Key, 
  UserCog, 
  Monitor, 
  Smartphone,
  ChevronRight
} from "lucide-react";

export default function Home() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Não autorizado",
        description: "Você foi desconectado. Fazendo login novamente...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  const handleLogout = () => {
    window.location.href = '/api/logout';
  };

  const getUserDisplayName = () => {
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    if (user.firstName) {
      return user.firstName;
    }
    if (user.email) {
      return user.email.split('@')[0];
    }
    return 'User';
  };

  const getUserInitials = () => {
    if (user.firstName && user.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    if (user.firstName) {
      return user.firstName[0].toUpperCase();
    }
    if (user.email) {
      return user.email[0].toUpperCase();
    }
    return 'U';
  };

  const getJoinDate = () => {
    if (user.createdAt) {
      return new Date(user.createdAt).toLocaleDateString('pt-BR', { 
        month: 'long', 
        year: 'numeric' 
      });
    }
    return 'Recentemente';
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Shield className="text-primary-foreground w-4 h-4" />
              </div>
              <h1 className="text-xl font-semibold text-foreground">TriAdd</h1>
            </div>
            
            <nav className="flex items-center space-x-6">
              <button className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-dashboard">
                Painel
              </button>
              <button className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-profile">
                Perfil
              </button>
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="text-destructive hover:text-destructive/80"
                data-testid="button-logout"
              >
                <User className="mr-2 h-4 w-4" />
                Sair
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-6xl mx-auto space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground">Bem-vindo ao seu Painel</h2>
            <p className="mt-2 text-lg text-muted-foreground">
              Você fez login com sucesso no TriAdd
            </p>
          </div>

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* User Profile Card */}
            <Card data-testid="card-user-profile">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={user.profileImageUrl || ''} alt="Profile" />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground" data-testid="text-user-name">
                      {getUserDisplayName()}
                    </h3>
                    <p className="text-sm text-muted-foreground" data-testid="text-user-email">
                      {user.email}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground">Membro desde</p>
                  <p className="text-sm font-medium text-foreground" data-testid="text-join-date">
                    {getJoinDate()}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Activity Card */}
            <Card data-testid="card-activity">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground">Atividade Recente</h3>
                  <Activity className="h-5 w-5 text-primary" />
                </div>
                <div className="mt-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Último login</span>
                    <span className="text-sm font-medium text-foreground" data-testid="text-last-login">
                      Agora mesmo
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Sessões</span>
                    <Badge variant="secondary" data-testid="badge-sessions">1 ativa</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Pontuação de segurança</span>
                    <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100" data-testid="badge-security-score">
                      95%
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions Card */}
            <Card data-testid="card-quick-actions">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Ações Rápidas</h3>
                <div className="space-y-3">
                  <Button
                    variant="secondary"
                    className="w-full justify-between hover-elevate"
                    data-testid="button-edit-profile"
                  >
                    <span className="flex items-center">
                      <UserCog className="mr-3 h-4 w-4 text-primary" />
                      Editar Perfil
                    </span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </Button>
                  <Button
                    variant="secondary"
                    className="w-full justify-between hover-elevate"
                    data-testid="button-change-password"
                  >
                    <span className="flex items-center">
                      <Key className="mr-3 h-4 w-4 text-primary" />
                      Alterar Senha
                    </span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </Button>
                  <Button
                    variant="secondary"
                    className="w-full justify-between hover-elevate"
                    data-testid="button-security-settings"
                  >
                    <span className="flex items-center">
                      <Shield className="mr-3 h-4 w-4 text-primary" />
                      Configurações de Segurança
                    </span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Sessions Table */}
          <Card data-testid="card-recent-sessions">
            <CardHeader className="border-b border-border">
              <CardTitle>Sessões Recentes</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Monitore a atividade e segurança da sua conta</p>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Dispositivo
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Localização
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Endereço IP
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Última Atividade
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr data-testid="row-session-current">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Monitor className="text-muted-foreground mr-3 h-5 w-5" />
                          <div>
                            <div className="text-sm font-medium text-foreground">Navegador Atual</div>
                            <div className="text-sm text-muted-foreground">Desktop</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                        Localização Atual
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground font-mono">
                        Seu IP
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                        Ativo agora
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100" data-testid="badge-status-active">
                          <div className="w-1.5 h-1.5 bg-green-600 rounded-full mr-1" />
                          Ativo
                        </Badge>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                <Shield className="text-primary-foreground w-3 h-3" />
              </div>
              <span className="text-sm text-muted-foreground">© 2024 TriAdd. Todos os direitos reservados.</span>
            </div>
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <button className="hover:text-foreground transition-colors">Política de Privacidade</button>
              <button className="hover:text-foreground transition-colors">Termos de Serviço</button>
              <button className="hover:text-foreground transition-colors">Suporte</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
