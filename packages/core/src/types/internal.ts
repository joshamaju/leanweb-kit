export interface SSRComponent {
  render(props: Record<string, any>): {
    html: string;
    head: string;
    css: { map: any; code: string };
  };
}

export interface Asset {
  file: string;
  size: number;
  type: string | null;
}

export interface BuildData {
  app_dir: string;
  assets: Asset[];
  app_path: string;
  service_worker: string | null;
}

export interface SSROptions {
  // csp: ValidatedConfig["kit"]["csp"];
  version_hash: string;
  service_worker: boolean;
  env_public_prefix: string;
  csrf_check_origin: boolean;
  env_private_prefix: string;
  templates: {
    error(values: { message: string; status: number }): string;
  };
}

export interface Env {
  private: Record<string, string>;
  public: Record<string, string>;
}
