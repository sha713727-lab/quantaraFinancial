export type ContactFieldName =
  | "firstName"
  | "lastName"
  | "email"
  | "phone"
  | "company"
  | "service"
  | "source"
  | "message";

export type ContactFieldErrors = {
  readonly firstName?: string;
  readonly lastName?: string;
  readonly email?: string;
  readonly phone?: string;
  readonly company?: string;
  readonly service?: string;
  readonly source?: string;
  readonly message?: string;
};

export type ContactActionState =
  | {
      readonly ok: true;
      readonly service: string;
    }
  | {
      readonly ok: false;
      readonly error: {
        readonly code:
          "INVALID_INPUT" | "FORBIDDEN" | "UNAVAILABLE" | "RATE_LIMITED";
        readonly message: string;
        readonly fields?: ContactFieldErrors;
        readonly retryAfterSeconds?: number;
      };
    };
