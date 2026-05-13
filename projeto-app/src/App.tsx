import { useEffect, useMemo, useState } from "react";
import { Layout } from "./components/Layout";
import { products } from "./lib/data";
import type { CartItem, Product, UserRole } from "./lib/types";
import { Auth } from "./pages/Auth";
import { Blog } from "./pages/Blog";
import { Cart } from "./pages/Cart";
import { Catalog } from "./pages/Catalog";
import { Dashboard } from "./pages/Dashboard";
import { Home } from "./pages/Home";
import { ProductDetails } from "./pages/ProductDetails";
import { Tracking } from "./pages/Tracking";

function getLocationState() {
  return {
    path: window.location.pathname.replace(/\/$/, "") || "/projeto",
    query: window.location.search
  };
}

export default function App() {
  const [locationState, setLocationState] = useState(getLocationState);
  const [role, setRole] = useState<UserRole>("guest");
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const onPopState = () => setLocationState(getLocationState());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  function navigate(path: string) {
    window.history.pushState({}, "", path);
    setLocationState(getLocationState());
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function addToCart(product: Product) {
    setCart((current) => {
      const existing = current.find((item) => item.product.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [...current, { product, quantity: 1 }];
    });
  }

  function updateQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((current) => current.map((item) => (item.product.id === productId ? { ...item, quantity } : item)));
  }

  function removeFromCart(productId: string) {
    setCart((current) => current.filter((item) => item.product.id !== productId));
  }

  const route = useMemo(() => {
    const path = locationState.path === "" ? "/projeto" : locationState.path;
    const params = new URLSearchParams(locationState.query);

    if (path === "/projeto" || path === "/projeto/index.html") {
      return { page: "home", params } as const;
    }

    if (path.startsWith("/projeto/produto/")) {
      return { page: "produto", slug: decodeURIComponent(path.replace("/projeto/produto/", "")), params } as const;
    }

    if (path === "/projeto/catalogo") return { page: "catalogo", params } as const;
    if (path === "/projeto/carrinho") return { page: "carrinho", params } as const;
    if (path === "/projeto/login") return { page: "login", params } as const;
    if (path === "/projeto/dashboard") return { page: "dashboard", params } as const;
    if (path === "/projeto/blog") return { page: "blog", params } as const;
    if (path === "/projeto/rastreio") return { page: "rastreio", params } as const;

    return { page: "home", params } as const;
  }, [locationState]);

  const currentPath = locationState.path || "/projeto";
  const product = route.page === "produto" ? products.find((item) => item.slug === route.slug) : undefined;

  return (
    <Layout currentPath={currentPath} role={role} cart={cart} onNavigate={navigate} onRoleChange={setRole}>
      {route.page === "home" ? <Home role={role} onNavigate={navigate} onAdd={addToCart} /> : null}

      {route.page === "catalogo" ? (
        <Catalog
          role={role}
          initialSearch={route.params.get("busca") ?? ""}
          initialCategory={route.params.get("categoria") ?? "Todas"}
          onAdd={addToCart}
          onNavigate={navigate}
        />
      ) : null}

      {route.page === "produto" ? (
        <ProductDetails product={product} role={role} onBack={() => navigate("/projeto/catalogo")} onAdd={addToCart} />
      ) : null}

      {route.page === "carrinho" ? (
        <Cart
          cart={cart}
          role={role}
          onUpdateQuantity={updateQuantity}
          onRemove={removeFromCart}
          onNavigate={navigate}
        />
      ) : null}

      {route.page === "login" ? <Auth onNavigate={navigate} /> : null}
      {route.page === "dashboard" ? <Dashboard role={role} onNavigate={navigate} /> : null}
      {route.page === "blog" ? <Blog /> : null}
      {route.page === "rastreio" ? <Tracking /> : null}
    </Layout>
  );
}
