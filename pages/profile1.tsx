const withSession = async (fn: (req, res) => Promise<any>) => {
  return (req, res) => {
    req.session.user;

    return fn(req, res);
  };
};

export const getServerSideProps = withSession(async (req, res) => {
  if (!req.session.user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  return {
    props: {
      user: req.session.user,
    }
  }
});

function Profile1({ user }) {
  console.log(user);


  return (
    <main>
      <pre>{JSON.stringify(user,null, 2)}</pre>
    </main>
  )
}

export default Profile1;
