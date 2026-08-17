export type ContactFieldName =
  "firstName" | "lastName" | "email" | "phone" | "message";

export type ContactFieldErrors = {
  readonly firstName?: string;
  readonly lastName?: string;
  readonly email?: string;
  readonly phone?: string;
  readonly message?: string;
};

export type ContactActionState =
  | {
      readonly ok: true;
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
