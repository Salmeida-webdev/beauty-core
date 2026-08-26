import {
  CalendarDays,
  CircleDollarSign,
  Sparkles,
  Users,
} from "lucide-react";

import { KpiCard } from "@/components/dashboard/kpi-card";
import { FoundationsDemo } from "@/components/design-system/foundations-demo";
import {
  FormActions,
  FormField,
  FormGrid,
  FormSection,
} from "@/components/forms/form-foundation";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import {
  ContentToolbar,
  PageSection,
  ResponsiveGrid,
} from "@/components/layout/page-section";
import {
  EmptyState,
  ErrorState,
  LoadingState,
  PermissionState,
} from "@/components/states/feedback-states";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatusBadge } from "@/components/ui/status-badge";
import { DesignSystemTableDemo } from "@/components/tables/design-system-table-demo";
import { DesignSystemOverlaysDemo } from "@/components/overlays/design-system-overlays-demo";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

export default function DesignSystemPage() {
  return (
    <PageContainer
      data-testid="design-system-page"
      size="wide"
      className="space-y-8"
    >
      <Breadcrumbs
        items={[
          {
            label: "Painel",
          },
          {
            label: "Design System",
          },
        ]}
      />

      <PageHeader
        eyebrow="Beauty Core 1.0"
        title="Design System"
        description="Fundação visual e estrutural do painel administrativo white-label, incluindo tokens, navegação, temas, responsividade e componentes reutilizáveis."
        meta="Ambiente técnico sem autenticação simulada."
        actions={
          <>
            <Button variant="outline">
              Ação secundária
            </Button>
            <Button>
              Ação principal
            </Button>
          </>
        }
      />


      <PageSection
        title="Fundações visuais"
        description="Tokens semânticos, tipografia, escalas estruturais e branding white-label."
      >
        <FoundationsDemo />
      </PageSection>

      <PageSection
        title="Indicadores"
        description="Cards reutilizáveis para métricas e KPIs administrativos."
      >
        <ResponsiveGrid>
          <KpiCard
            label="Clientes ativos"
            value="1.284"
            description="Exemplo técnico"
            icon={Users}
            badge={
              <StatusBadge tone="success">
                +12,4%
              </StatusBadge>
            }
          />

          <KpiCard
            label="Agenda do dia"
            value="38"
            description="Exemplo técnico"
            icon={CalendarDays}
            badge={
              <StatusBadge tone="info">
                Hoje
              </StatusBadge>
            }
          />

          <KpiCard
            label="Receita mensal"
            value="R$ 48,2 mil"
            description="Exemplo técnico"
            icon={CircleDollarSign}
            badge={
              <StatusBadge tone="success">
                +8,1%
              </StatusBadge>
            }
          />

          <KpiCard
            label="Serviços"
            value="24"
            description="Exemplo técnico"
            icon={Sparkles}
            badge={
              <StatusBadge tone="neutral">
                Catálogo
              </StatusBadge>
            }
          />
        </ResponsiveGrid>
      </PageSection>

      <PageSection
        title="Status semânticos"
        description="Estados visuais reutilizáveis sem depender exclusivamente de cor."
      >
        <div className="flex flex-wrap gap-2 rounded-large border border-border-subtle bg-surface-elevated p-card shadow-subtle">
          <StatusBadge>
            Neutro
          </StatusBadge>

          <StatusBadge tone="success">
            Sucesso
          </StatusBadge>

          <StatusBadge tone="warning">
            Atenção
          </StatusBadge>

          <StatusBadge tone="danger">
            Erro
          </StatusBadge>

          <StatusBadge tone="info">
            Informação
          </StatusBadge>
        </div>
      </PageSection>

      <PageSection
        title="Formulários"
        description="Fundação visual para formulários administrativos consistentes e acessíveis."
      >
        <FormSection
          title="Dados demonstrativos"
          description="Controles técnicos sem persistência ou integração com backend."
        >
          <FormGrid>
            <FormField
              id="demo-name"
              label="Nome"
              required
              description="Identificação exibida no cadastro."
            >
              <Input
                id="demo-name"
                placeholder="Ex.: Maria Silva"
                aria-describedby="demo-name-description"
              />
            </FormField>

            <FormField
              id="demo-category"
              label="Categoria"
              description="Exemplo de seleção simples."
            >
              <Select defaultValue="estetica">
                <SelectTrigger
                  id="demo-category"
                  aria-describedby="demo-category-description"
                >
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="estetica">
                    Estética
                  </SelectItem>
                  <SelectItem value="beleza">
                    Beleza
                  </SelectItem>
                  <SelectItem value="bem-estar">
                    Bem-estar
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormField>

            <FormField
              id="demo-email"
              label="E-mail"
              error="Exemplo de mensagem de validação."
            >
              <Input
                id="demo-email"
                type="email"
                defaultValue="email-invalido"
                aria-invalid="true"
                aria-describedby="demo-email-error"
              />
            </FormField>

            <FormField
              id="demo-description"
              label="Observações"
            >
              <Textarea
                id="demo-description"
                placeholder="Adicione informações complementares."
              />
            </FormField>
          </FormGrid>

          <div className="grid grid-cols-1 gap-form lg:grid-cols-3">
            <div className="space-y-3">
              <p className="text-label font-semibold text-text-primary">
                Preferências
              </p>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="demo-confirmation"
                  defaultChecked
                />
                <Label htmlFor="demo-confirmation">
                  Confirmar automaticamente
                </Label>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-label font-semibold text-text-primary">
                Disponibilidade
              </p>

              <div className="flex items-center gap-2">
                <Switch
                  id="demo-active"
                  defaultChecked
                />
                <Label htmlFor="demo-active">
                  Cadastro ativo
                </Label>
              </div>
            </div>

            <div className="space-y-3">
              <p
                id="demo-channel-label"
                className="text-label font-semibold text-text-primary"
              >
                Canal preferencial
              </p>

              <RadioGroup
                defaultValue="whatsapp"
                aria-labelledby="demo-channel-label"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem
                    value="whatsapp"
                    id="demo-whatsapp"
                  />
                  <Label htmlFor="demo-whatsapp">
                    WhatsApp
                  </Label>
                </div>

                <div className="flex items-center gap-2">
                  <RadioGroupItem
                    value="email"
                    id="demo-radio-email"
                  />
                  <Label htmlFor="demo-radio-email">
                    E-mail
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <FormActions>
            <Button variant="outline">
              Cancelar
            </Button>

            <Button>
              Salvar exemplo
            </Button>
          </FormActions>
        </FormSection>
      </PageSection>

      <PageSection
        title="Estrutura de conteúdo"
        description="Componentes estruturais compartilhados para páginas administrativas."
      >
        <ContentToolbar>
          <div>
            <p className="text-label font-semibold text-text-primary">
              Toolbar responsiva
            </p>
            <p className="text-caption text-text-muted">
              Ações e filtros poderão ocupar esta região.
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
          >
            Exemplo
          </Button>
        </ContentToolbar>
      </PageSection>

      <PageSection
        title="Estados operacionais"
        description="Loading, vazio, erro e permissão negada com semântica e acessibilidade."
      >
        <div className="grid grid-cols-1 gap-grid xl:grid-cols-2">
          <LoadingState />

          <EmptyState
            action={
              <Button size="sm">
                Criar registro
              </Button>
            }
          />

          <ErrorState />

          <PermissionState />
        </div>
      </PageSection>


      <PageSection
        title="Tabelas"
        description="Estrutura responsiva para listagens administrativas, filtros, status e ações."
      >
        <DesignSystemTableDemo />
      </PageSection>


      <PageSection
        title="Overlays e ações"
        description="Dialog, confirmação, dropdown e drawer com comportamento acessível e reutilizável."
      >
        <DesignSystemOverlaysDemo />
      </PageSection>

      <PageSection
        title="Ambiente técnico"
        description="Esta rota demonstra a infraestrutura do Chat 45 sem criar usuário, token, sessão ou permissão fictícia."
      >
        <div className="rounded-large border border-border-subtle bg-surface-elevated p-card shadow-card">
          <p className="text-body-small text-text-muted">
            Os próximos blocos ampliarão esta página com
            tabelas, overlays e testes automatizados.
          </p>
        </div>
      </PageSection>
    </PageContainer>
  );
}
