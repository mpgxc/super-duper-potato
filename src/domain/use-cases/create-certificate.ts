type CreateCertificateInput = {
  slug: string;
  path: string;
  title: string;
  active: boolean;
  description: string;
};

interface ICreateCertificate<Response = void> {
  handle(props: CreateCertificateInput): Promise<Response>;
}

export { ICreateCertificate, CreateCertificateInput };
