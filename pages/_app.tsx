import type { AppProps } from "next/app";
import styled from "@emotion/styled";
import { Layout } from "antd";

import Sidebar from "../components/common/Sidebar";
import Footer from "../components/common/Footer";
import Head from "next/head";
import "antd/dist/antd.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const CustomContents = styled(Layout.Content)`
  display: flex;
  height: calc(100vh - 70px);
  background-color: white;
  padding: 20px;
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {/* Same as */}
      <ToastContainer />
      <Head>
        <title>Usher</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Sidebar />
      <Layout>
        <CustomContents>
          <Component {...pageProps} />
        </CustomContents>
        <Footer />
      </Layout>
    </Layout>
  );
}

export default MyApp;
