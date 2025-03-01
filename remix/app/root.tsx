import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
} from "@remix-run/react";

import type { LoaderFunction } from "@remix-run/node";
import tailwindStyles from "./styles/tailwind.css";
import { BasketProvider } from "./components/basket";
import { locale } from "./config/locale";
import { BasketButton } from "./components/basket/basket-button";
import { QueryClient, QueryClientProvider } from "react-query";
import { ErrorComponent } from "./components/404";
import { props } from "lodash/fp";

const queryClient = new QueryClient();


export function links() {
  return [{ rel: "stylesheet", href: tailwindStyles }];
}

export const loader: LoaderFunction = () => {
  return {
    ENV: {
  SERVICE_API_URL: process.env.SERVICE_API_URL,
      TENANT_IDENTIFIER: process.env.CRYSTALLIZE_TENANT_IDENTIFIER,
      NODE_EXECUTION_MODE: process.env.NODE_EXECUTION_MODE,
    },
  };
};

export default function App() {
  const data = useLoaderData();

  if (typeof window !== "undefined") {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("/sw.js").then(
        function (registration) {
          console.log(
            "ServiceWorker registration successful with scope: ",
            registration.scope
          );
        },
        function (err) {
          console.log("ServiceWorker registration failed: ", err);
        }
      );
    });
  }

  return (
    <html lang="en" className="bg-primary relative z-10">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link
          rel="apple-touch-icon"
          href="/icons/windows11/Square150x150Logo.scale-100.png"
        />
        <link
          rel="icon"
          type="image/png"
          href="/icons/windows11/Square150x150Logo.scale-100.png"
        />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta
          name="msapplication-TileImage"
          content="/icons/windows11/Square150x150Logo.scale-100.png"
        />
        <meta name="theme-color" content="#ffffff" />
        <link
          rel="apple-touch-startup-image"
          href="/images/icons/windows11/Square150x150Logo.scale-100.png"
        />
        <meta name="apple-mobile-web-app-title" content="Dounot" />
        <link rel="manifest" href="/manifest.json" />

        <Meta />
        <Links />

        <script suppressHydrationWarning={true} type="text/css">
          {
            '*,:after,:before{box-sizing:border-box;border:0 solid}:after,:before{--tw-content:""}html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}body{margin:0;line-height:inherit}h2{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}figure,h2,p{margin:0}img,svg{display:block;vertical-align:middle}img{max-width:100%;height:auto}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-date-and-time-value{min-height:1.5em}*,:after,:before{--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:#3b82f680;--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }.container{width:100%}@media (max-width:1024px){#grid-item{grid-column:span 3!important}}.absolute{position:absolute}.relative{position:relative}.-right-2{right:-.5rem}.-top-2{top:-.5rem}.z-10{z-index:10}.mx-auto{margin-left:auto;margin-right:auto}.mt-4{margin-top:1rem}.flex{display:flex}.h-80{height:20rem}.h-full{height:100%}.h-5{height:1.25rem}.w-full{width:100%}.w-60{width:15rem}.w-5{width:1.25rem}.flex-col{flex-direction:column}.items-start{align-items:flex-start}.items-center{align-items:center}.justify-between{justify-content:space-between}.justify-evenly{justify-content:space-evenly}.gap-5{gap:1.25rem}.gap-1{gap:.25rem}.self-end{align-self:flex-end}.overflow-hidden{overflow:hidden}.rounded-xl{border-radius:.75rem}.rounded-2xl{border-radius:1rem}.rounded-full{border-radius:1000px}.rounded-r-xl{border-top-right-radius:.75rem;border-bottom-right-radius:.75rem}.bg-primary{--tw-bg-opacity:1;background-color:rgb(255 247 240/var(--tw-bg-opacity))}.bg-background1{--tw-bg-opacity:1;background-color:rgb(240 239 235/var(--tw-bg-opacity))}.bg-grey{background-color:#00000008}.bg-text{--tw-bg-opacity:1;background-color:rgb(55 53 103/var(--tw-bg-opacity))}.p-8{padding:2rem}.p-5{padding:1.25rem}.px-5{padding-left:1.25rem;padding-right:1.25rem}.px-2{padding-left:.5rem;padding-right:.5rem}.py-1{padding-top:.25rem;padding-bottom:.25rem}.py-7{padding-top:1.75rem;padding-bottom:1.75rem}.py-20{padding-top:5rem;padding-bottom:5rem}.text-center{text-align:center}.text-3xl{font-size:1.875rem;line-height:2.25rem}.text-sm{font-size:.875rem;line-height:1.25rem}.font-bold{font-weight:700}.text-primary{--tw-text-opacity:1;color:rgb(255 247 240/var(--tw-text-opacity))}'
          }
        </script>
        <script
          defer
          src="https://pim.crystallize.com/static/frontend-preview-listener.js"
        />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <BasketProvider {...props} locale={locale} children={undefined}>
            <Layout children={undefined}>
              <Outlet />
              <script
                dangerouslySetInnerHTML={{
                  __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
                }}
              ></script>

              <ScrollRestoration />
              {data.ENV.NODE_EXECUTION_MODE === "development" && <LiveReload />}
            </Layout>
          </BasketProvider>
        </QueryClientProvider>
        <Scripts />
      </body>
    </html>
  );
}

function Layout({ children }) {
  return (
    <div className="remix-app lg:w-content w-full mx-auto p-8 sm:px-6">
      <header className="remix-app__header">
        <div className="container remix-app__header-content flex justify-between">
          <Link
            prefetch="intent"
            to="/"
            title="Remix"
            className="remix-app__header-home-link"
          >
            <Logo />
          </Link>
          <Link
            prefetch="intent"
            to="/cart"
            title="Your cart"
            className="remix-app__header-link"
          >
            <BasketButton />
          </Link>
        </div>
      </header>
      <div className="remix-app__main">
        <div className="container remix-app__main-content">{children}</div>
      </div>
      <footer className="remix-app__footer">
        <div className="container remix-app__footer-content mt-40">
          <Link
            prefetch="intent"
            to="/"
            title="Remix"
            className="remix-app__header-home-link"
          >
            <Logo />
          </Link>
        </div>
      </footer>
    </div>
  );
}

function Logo(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      width="49"
      height="54"
      viewBox="0 0 49 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.45312 18.0625H3.66797L3.69141 14.8984H7.45312C8.23438 14.8984 8.89453 14.7109 9.43359 14.3359C9.98047 13.9609 10.3945 13.4023 10.6758 12.6602C10.9648 11.9102 11.1094 10.9883 11.1094 9.89453V9.15625C11.1094 8.33594 11.0273 7.61719 10.8633 7C10.707 6.375 10.4727 5.85547 10.1602 5.44141C9.84766 5.01953 9.45703 4.70312 8.98828 4.49219C8.52734 4.28125 7.99609 4.17578 7.39453 4.17578H3.59766V1H7.39453C8.55078 1 9.60938 1.19922 10.5703 1.59766C11.5391 1.98828 12.375 2.55078 13.0781 3.28516C13.7891 4.01172 14.3359 4.875 14.7188 5.875C15.1094 6.86719 15.3047 7.96875 15.3047 9.17969V9.89453C15.3047 11.0977 15.1094 12.1992 14.7188 13.1992C14.3359 14.1992 13.793 15.0625 13.0898 15.7891C12.3867 16.5156 11.5547 17.0781 10.5938 17.4766C9.64062 17.8672 8.59375 18.0625 7.45312 18.0625ZM6.02344 1V18.0625H1.91016V1H6.02344ZM31.8867 9.19141V9.88281C31.8867 11.1875 31.7031 12.3594 31.3359 13.3984C30.9766 14.4297 30.4648 15.3125 29.8008 16.0469C29.1367 16.7734 28.3516 17.332 27.4453 17.7227C26.5391 18.1055 25.5391 18.2969 24.4453 18.2969C23.3438 18.2969 22.3359 18.1055 21.4219 17.7227C20.5156 17.332 19.7266 16.7734 19.0547 16.0469C18.3906 15.3125 17.875 14.4297 17.5078 13.3984C17.1484 12.3594 16.9688 11.1875 16.9688 9.88281V9.19141C16.9688 7.88672 17.1484 6.71484 17.5078 5.67578C17.875 4.63672 18.3867 3.75391 19.043 3.02734C19.707 2.29297 20.4922 1.73438 21.3984 1.35156C22.3125 0.960938 23.3203 0.765625 24.4219 0.765625C25.5156 0.765625 26.5156 0.960938 27.4219 1.35156C28.3359 1.73438 29.125 2.29297 29.7891 3.02734C30.4531 3.75391 30.9688 4.63672 31.3359 5.67578C31.7031 6.71484 31.8867 7.88672 31.8867 9.19141ZM27.7148 9.88281V9.16797C27.7148 8.32422 27.6406 7.58203 27.4922 6.94141C27.3516 6.29297 27.1406 5.75 26.8594 5.3125C26.5781 4.875 26.2305 4.54688 25.8164 4.32812C25.4102 4.10156 24.9453 3.98828 24.4219 3.98828C23.875 3.98828 23.3984 4.10156 22.9922 4.32812C22.5859 4.54688 22.2461 4.875 21.9727 5.3125C21.6992 5.75 21.4922 6.29297 21.3516 6.94141C21.2188 7.58203 21.1523 8.32422 21.1523 9.16797V9.88281C21.1523 10.7188 21.2188 11.4609 21.3516 12.1094C21.4922 12.75 21.6992 13.293 21.9727 13.7383C22.2539 14.1836 22.5977 14.5195 23.0039 14.7461C23.418 14.9727 23.8984 15.0859 24.4453 15.0859C24.9688 15.0859 25.4336 14.9727 25.8398 14.7461C26.2461 14.5195 26.5859 14.1836 26.8594 13.7383C27.1406 13.293 27.3516 12.75 27.4922 12.1094C27.6406 11.4609 27.7148 10.7188 27.7148 9.88281ZM45.1875 1H46.6289V12.5547C46.6289 13.8359 46.3594 14.9023 45.8203 15.7539C45.2812 16.6055 44.5547 17.2422 43.6406 17.6641C42.7344 18.0859 41.7305 18.2969 40.6289 18.2969C39.4961 18.2969 38.4766 18.0859 37.5703 17.6641C36.6641 17.2422 35.9453 16.6055 35.4141 15.7539C34.8906 14.9023 34.6289 13.8359 34.6289 12.5547V1H36.0586V12.5547C36.0586 13.5469 36.2539 14.3789 36.6445 15.0508C37.0352 15.7227 37.5742 16.2266 38.2617 16.5625C38.9492 16.8984 39.7383 17.0664 40.6289 17.0664C41.5117 17.0664 42.2969 16.8984 42.9844 16.5625C43.6719 16.2266 44.2109 15.7227 44.6016 15.0508C44.9922 14.3789 45.1875 13.5469 45.1875 12.5547V1ZM16.1602 20V37.0625H12.0586L6.02344 26.4453V37.0625H1.91016V20H6.02344L12.0586 30.6172V20H16.1602ZM33.1992 28.1914V28.8828C33.1992 30.1875 33.0156 31.3594 32.6484 32.3984C32.2891 33.4297 31.7773 34.3125 31.1133 35.0469C30.4492 35.7734 29.6641 36.332 28.7578 36.7227C27.8516 37.1055 26.8516 37.2969 25.7578 37.2969C24.6562 37.2969 23.6484 37.1055 22.7344 36.7227C21.8281 36.332 21.0391 35.7734 20.3672 35.0469C19.7031 34.3125 19.1875 33.4297 18.8203 32.3984C18.4609 31.3594 18.2812 30.1875 18.2812 28.8828V28.1914C18.2812 26.8867 18.4609 25.7148 18.8203 24.6758C19.1875 23.6367 19.6992 22.7539 20.3555 22.0273C21.0195 21.293 21.8047 20.7344 22.7109 20.3516C23.625 19.9609 24.6328 19.7656 25.7344 19.7656C26.8281 19.7656 27.8281 19.9609 28.7344 20.3516C29.6484 20.7344 30.4375 21.293 31.1016 22.0273C31.7656 22.7539 32.2812 23.6367 32.6484 24.6758C33.0156 25.7148 33.1992 26.8867 33.1992 28.1914ZM29.0273 28.8828V28.168C29.0273 27.3242 28.9531 26.582 28.8047 25.9414C28.6641 25.293 28.4531 24.75 28.1719 24.3125C27.8906 23.875 27.543 23.5469 27.1289 23.3281C26.7227 23.1016 26.2578 22.9883 25.7344 22.9883C25.1875 22.9883 24.7109 23.1016 24.3047 23.3281C23.8984 23.5469 23.5586 23.875 23.2852 24.3125C23.0117 24.75 22.8047 25.293 22.6641 25.9414C22.5312 26.582 22.4648 27.3242 22.4648 28.168V28.8828C22.4648 29.7188 22.5312 30.4609 22.6641 31.1094C22.8047 31.75 23.0117 32.293 23.2852 32.7383C23.5664 33.1836 23.9102 33.5195 24.3164 33.7461C24.7305 33.9727 25.2109 34.0859 25.7578 34.0859C26.2812 34.0859 26.7461 33.9727 27.1523 33.7461C27.5586 33.5195 27.8984 33.1836 28.1719 32.7383C28.4531 32.293 28.6641 31.75 28.8047 31.1094C28.9531 30.4609 29.0273 29.7188 29.0273 28.8828ZM42.5859 20V37.0625H38.4727V20H42.5859ZM47.7188 20V23.1758H33.457V20H47.7188Z"
        fill="#373567"
      />
      <path
        d="M7.01233 51.2188C6.46025 51.2188 5.95243 51.1172 5.48889 50.9141C5.03056 50.7109 4.62952 50.4245 4.28577 50.0547C3.94722 49.6849 3.6842 49.2474 3.4967 48.7422C3.31441 48.2318 3.22327 47.6745 3.22327 47.0703V46.7344C3.22327 46.0833 3.31962 45.4948 3.51233 44.9688C3.70504 44.4427 3.97066 43.9922 4.3092 43.6172C4.64775 43.2422 5.03316 42.9557 5.46545 42.7578C5.90295 42.5547 6.36129 42.4531 6.84045 42.4531C7.37691 42.4531 7.85347 42.5495 8.27014 42.7422C8.68681 42.9297 9.03577 43.1979 9.31702 43.5469C9.60347 43.8906 9.81962 44.2995 9.96545 44.7734C10.1113 45.2422 10.1842 45.7604 10.1842 46.3281V46.8984H3.78577V46.1016H9.25452V45.9922C9.2441 45.5182 9.14775 45.0755 8.96545 44.6641C8.78837 44.2474 8.52275 43.9089 8.16858 43.6484C7.81441 43.388 7.3717 43.2578 6.84045 43.2578C6.44462 43.2578 6.08004 43.3411 5.7467 43.5078C5.41858 43.6745 5.13472 43.9141 4.89514 44.2266C4.66077 44.5339 4.47847 44.901 4.34827 45.3281C4.22327 45.75 4.16077 46.2188 4.16077 46.7344V47.0703C4.16077 47.5391 4.22847 47.9766 4.36389 48.3828C4.50452 48.7839 4.70243 49.138 4.95764 49.4453C5.21806 49.7526 5.52535 49.9922 5.87952 50.1641C6.23368 50.3359 6.62431 50.4219 7.05139 50.4219C7.55139 50.4219 7.9941 50.3307 8.37952 50.1484C8.76493 49.9609 9.11129 49.6667 9.41858 49.2656L10.0045 49.7188C9.82222 49.9896 9.59306 50.2396 9.31702 50.4688C9.04618 50.6979 8.72066 50.8802 8.34045 51.0156C7.96025 51.151 7.51754 51.2188 7.01233 51.2188ZM17.1686 49.5469V45.1875C17.1686 44.7865 17.0852 44.4401 16.9186 44.1484C16.7519 43.8568 16.5071 43.6328 16.1842 43.4766C15.8613 43.3203 15.4628 43.2422 14.9889 43.2422C14.5514 43.2422 14.1608 43.3203 13.817 43.4766C13.4785 43.6276 13.2102 43.8333 13.0123 44.0938C12.8196 44.349 12.7233 44.6328 12.7233 44.9453L11.7858 44.9375C11.7858 44.6198 11.8639 44.3125 12.0201 44.0156C12.1764 43.7188 12.3977 43.4531 12.6842 43.2188C12.9707 42.9844 13.3118 42.7995 13.7076 42.6641C14.1087 42.5234 14.5488 42.4531 15.028 42.4531C15.6321 42.4531 16.1634 42.5547 16.6217 42.7578C17.0852 42.9609 17.4472 43.2656 17.7076 43.6719C17.9681 44.0781 18.0983 44.5885 18.0983 45.2031V49.2891C18.0983 49.5807 18.1191 49.8828 18.1608 50.1953C18.2076 50.5078 18.2727 50.7656 18.3561 50.9688V51.0625H17.3639C17.3014 50.875 17.2519 50.6406 17.2155 50.3594C17.1842 50.0729 17.1686 49.8021 17.1686 49.5469ZM17.3873 46.1406L17.403 46.8594H15.567C15.0878 46.8594 14.6582 46.9036 14.278 46.9922C13.903 47.0755 13.5852 47.2005 13.3248 47.3672C13.0644 47.5286 12.8639 47.724 12.7233 47.9531C12.5878 48.1823 12.5201 48.4427 12.5201 48.7344C12.5201 49.0365 12.5957 49.3125 12.7467 49.5625C12.903 49.8125 13.1217 50.013 13.403 50.1641C13.6894 50.3099 14.028 50.3828 14.4186 50.3828C14.9394 50.3828 15.3977 50.2865 15.7936 50.0938C16.1946 49.901 16.5253 49.6484 16.7858 49.3359C17.0462 49.0234 17.2207 48.6823 17.3092 48.3125L17.7155 48.8516C17.6477 49.112 17.5227 49.3802 17.3405 49.6562C17.1634 49.9271 16.9316 50.1823 16.6451 50.4219C16.3587 50.6562 16.0201 50.849 15.6295 51C15.2441 51.1458 14.8066 51.2188 14.317 51.2188C13.7649 51.2188 13.2832 51.1146 12.8717 50.9062C12.4655 50.6979 12.1477 50.4141 11.9186 50.0547C11.6946 49.6901 11.5826 49.2786 11.5826 48.8203C11.5826 48.4036 11.6712 48.0312 11.8483 47.7031C12.0253 47.3698 12.2806 47.0885 12.6139 46.8594C12.9524 46.625 13.3587 46.4479 13.8326 46.3281C14.3118 46.2031 14.8483 46.1406 15.442 46.1406H17.3873ZM23.8014 42.6094V43.375H19.567V42.6094H23.8014ZM21.1217 40.4375H22.0514V49.0078C22.0514 49.3984 22.1035 49.6927 22.2076 49.8906C22.3118 50.0885 22.4472 50.2214 22.6139 50.2891C22.7806 50.3568 22.9602 50.3906 23.153 50.3906C23.2936 50.3906 23.429 50.3828 23.5592 50.3672C23.6894 50.3464 23.8066 50.3255 23.9108 50.3047L23.9498 51.0938C23.8352 51.1302 23.6868 51.1589 23.5045 51.1797C23.3222 51.2057 23.1399 51.2188 22.9576 51.2188C22.5983 51.2188 22.2806 51.1536 22.0045 51.0234C21.7285 50.888 21.5123 50.6589 21.3561 50.3359C21.1998 50.0078 21.1217 49.5625 21.1217 49V40.4375ZM34.8092 49.5469V45.1875C34.8092 44.7865 34.7259 44.4401 34.5592 44.1484C34.3925 43.8568 34.1477 43.6328 33.8248 43.4766C33.5019 43.3203 33.1035 43.2422 32.6295 43.2422C32.192 43.2422 31.8014 43.3203 31.4576 43.4766C31.1191 43.6276 30.8509 43.8333 30.653 44.0938C30.4602 44.349 30.3639 44.6328 30.3639 44.9453L29.4264 44.9375C29.4264 44.6198 29.5045 44.3125 29.6608 44.0156C29.817 43.7188 30.0384 43.4531 30.3248 43.2188C30.6113 42.9844 30.9524 42.7995 31.3483 42.6641C31.7493 42.5234 32.1894 42.4531 32.6686 42.4531C33.2727 42.4531 33.804 42.5547 34.2623 42.7578C34.7259 42.9609 35.0878 43.2656 35.3483 43.6719C35.6087 44.0781 35.7389 44.5885 35.7389 45.2031V49.2891C35.7389 49.5807 35.7597 49.8828 35.8014 50.1953C35.8483 50.5078 35.9134 50.7656 35.9967 50.9688V51.0625H35.0045C34.942 50.875 34.8925 50.6406 34.8561 50.3594C34.8248 50.0729 34.8092 49.8021 34.8092 49.5469ZM35.028 46.1406L35.0436 46.8594H33.2076C32.7285 46.8594 32.2988 46.9036 31.9186 46.9922C31.5436 47.0755 31.2259 47.2005 30.9655 47.3672C30.705 47.5286 30.5045 47.724 30.3639 47.9531C30.2285 48.1823 30.1608 48.4427 30.1608 48.7344C30.1608 49.0365 30.2363 49.3125 30.3873 49.5625C30.5436 49.8125 30.7623 50.013 31.0436 50.1641C31.33 50.3099 31.6686 50.3828 32.0592 50.3828C32.58 50.3828 33.0384 50.2865 33.4342 50.0938C33.8352 49.901 34.166 49.6484 34.4264 49.3359C34.6868 49.0234 34.8613 48.6823 34.9498 48.3125L35.3561 48.8516C35.2884 49.112 35.1634 49.3802 34.9811 49.6562C34.804 49.9271 34.5722 50.1823 34.2858 50.4219C33.9993 50.6562 33.6608 50.849 33.2701 51C32.8847 51.1458 32.4472 51.2188 31.9576 51.2188C31.4056 51.2188 30.9238 51.1146 30.5123 50.9062C30.1061 50.6979 29.7884 50.4141 29.5592 50.0547C29.3352 49.6901 29.2233 49.2786 29.2233 48.8203C29.2233 48.4036 29.3118 48.0312 29.4889 47.7031C29.666 47.3698 29.9212 47.0885 30.2545 46.8594C30.5931 46.625 30.9993 46.4479 31.4733 46.3281C31.9524 46.2031 32.4889 46.1406 33.0826 46.1406H35.028ZM39.2858 39.0625V51.0625H38.3561V39.0625H39.2858ZM42.8795 39.0625V51.0625H41.9498V39.0625H42.8795Z"
        fill="#373567"
      />
    </svg>
  );
}

export function ErrorBoundary() {
  return (
    <html className="bg-primary">
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body style={{ height: "100vh" }}>
        <Layout children={undefined}>
          <ErrorComponent />
        </Layout>
        <Scripts />
      </body>
    </html>
  );
}

export function CatchBoundary() {
  return (
    <html className="bg-primary">
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body style={{ height: "100vh" }}>
        <Layout children={undefined}>
          <ErrorComponent />
        </Layout>
        <Scripts />
      </body>
    </html>
  );
}
