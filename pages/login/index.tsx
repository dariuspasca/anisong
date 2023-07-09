import { AuthPage } from "@refinedev/core";

import { GetServerSideProps } from "next";

import { authProvider } from "src/authProvider";

export default function Login() {
  return (
    <AuthPage
      type="login"
      renderContent={(content) => (
        <div>
          <p
            style={{
              padding: 10,
              color: "#004085",
              backgroundColor: "#cce5ff",
              borderColor: "#b8daff",
              textAlign: "center",
            }}
          >
            email: info@refine.dev
            <br /> password: refine-supabase
          </p>
          {content}
        </div>
      )}
    />
  );
}

Login.noLayout = true;

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const { authenticated } = await authProvider.check(context);

  if (authenticated) {
    return {
      props: {},
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
