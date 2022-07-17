//lib imports
import NProgress from "nprogress";
import Router from "next/router";

//redux imports
import { wrapper } from "src/redux/store";

//component imports
import FrontLayout from "src/components/layouts/FrontLayout";

//util imports
import { authToken } from "src/utils/api";

//style imports
import "src/styles/global.less";

Router.events.on("routeChangeStart", (url) => {
  console.log(`Loading URL: ${url}`);
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function App({ Component, pageProps, router }) {
  return (
    <FrontLayout>
      <Component {...pageProps} />
    </FrontLayout>
      
  );
}

export default wrapper.withRedux(App);
