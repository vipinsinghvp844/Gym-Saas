export const INTEGRATION_SCHEMAS = {
  stripe: {
    title: "Stripe Configuration",
    fields: [
      {
        key: "publishable_key",
        label: "Publishable Key",
        required: true,
      },
      {
        key: "secret_key",
        label: "Secret Key",
        type: "password",
        required: true,
      },
      {
        key: "webhook_secret",
        label: "Webhook Secret",
        required: false,
      },
    ],
  },

  smtp: {
    title: "SMTP Configuration",
    fields: [
      { key: "host", label: "SMTP Host", required: true },
      { key: "port", label: "SMTP Port", required: true },
      { key: "username", label: "Username", required: true },
      {
        key: "password",
        label: "Password",
        type: "password",
        required: true,
      },
    ],
  },

  sendgrid: {
    title: "SendGrid Configuration",
    fields: [
      {
        key: "api_key",
        label: "API Key",
        type: "password",
        required: true,
      },
      {
        key: "from_email",
        label: "From Email",
        required: true,
      },
    ],
  },

  slack: {
    title: "Slack Configuration",
    fields: [
      {
        key: "webhook_url",
        label: "Webhook URL",
        required: true,
      },
      {
        key: "channel",
        label: "Default Channel",
        required: false,
      },
    ],
  },

  zapier: {
    title: "Zapier Configuration",
    fields: [
      {
        key: "webhook_url",
        label: "Webhook URL",
        required: true,
      },
    ],
  },

  webhooks: {
    title: "Webhook Configuration",
    fields: [
      {
        key: "endpoint",
        label: "Endpoint URL",
        required: true,
      },
      {
        key: "secret",
        label: "Secret",
        type: "password",
        required: false,
      },
    ],
  },
};
