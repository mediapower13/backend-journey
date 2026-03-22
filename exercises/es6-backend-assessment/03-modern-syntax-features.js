const users = [
  {
    id: 1,
    profile: {
      name: "Ada",
      contact: { email: "ada@mail.com" },
      settings: { theme: "dark" }
    }
  },
  {
    id: 2,
    profile: {
      name: "Tobi"
    }
  },
  {
    id: 3
  }
];

const getEmail = user => user?.profile?.contact?.email ?? "email not available";
const getTheme = user => user?.profile?.settings?.theme ?? "light";
const getDisplayName = user => user?.profile?.name ?? "Anonymous";

users.forEach(user => {
  console.log("user", user?.id ?? "unknown");
  console.log("name:", getDisplayName(user));
  console.log("email:", getEmail(user));
  console.log("theme:", getTheme(user));
});

const apiResponse = {
  status: 200,
  data: {
    items: [{ id: "p1", title: "Node API Basics" }],
    pagination: { page: 1 }
  }
};

const firstItemTitle = apiResponse?.data?.items?.[0]?.title ?? "No item title";
const totalPages = apiResponse?.data?.pagination?.totalPages ?? 1;
const nextPage = apiResponse?.data?.pagination?.nextPage ?? null;

console.log("firstItemTitle:", firstItemTitle);
console.log("totalPages:", totalPages);
console.log("nextPage:", nextPage);

const envConfig = {
  appName: "backend-service",
  port: 0,
  db: {
    host: "localhost",
    options: null
  }
};

const appName = envConfig?.appName ?? "default-app";
const port = envConfig?.port ?? 3000;
const dbHost = envConfig?.db?.host ?? "127.0.0.1";
const sslEnabled = envConfig?.db?.options?.ssl ?? false;

console.log("appName:", appName);
console.log("port:", port);
console.log("dbHost:", dbHost);
console.log("sslEnabled:", sslEnabled);

const getOrderSummary = order => {
  const customer = order?.customer?.name ?? "Unknown customer";
  const itemCount = order?.items?.length ?? 0;
  const total = order?.payment?.total ?? 0;
  return `${customer} | items: ${itemCount} | total: ${total}`;
};

const orderA = {
  customer: { name: "Ruth" },
  items: [{ id: 1 }, { id: 2 }],
  payment: { total: 5500 }
};

const orderB = {
  customer: null,
  items: null
};

console.log("orderA summary:", getOrderSummary(orderA));
console.log("orderB summary:", getOrderSummary(orderB));
