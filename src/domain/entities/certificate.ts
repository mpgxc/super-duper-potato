import { Entity } from 'commons/domain';

type CertificateProps = {
  slug: string;
  path: string;
  title: string;
  active: boolean;
  description: string;
};

class Certificate extends Entity<CertificateProps> {
  private constructor(props: CertificateProps, id?: string) {
    super(props, id);
  }

  get slug(): string {
    return this._props.slug;
  }

  get path(): string {
    return this._props.path;
  }

  get title(): string {
    return this._props.title;
  }

  get active(): boolean {
    return this._props.active;
  }

  get description(): string {
    return this._props.description;
  }

  static build(props: CertificateProps, id?: string): Certificate {
    return new this(props, id);
  }
}

export { Certificate };
