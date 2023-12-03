function Footer() {
  return (
    <>
      <footer className="bg-dark-subtle text-center text-lg-start fixed-bottom">
        <div className="text-center p-3">
          © {new Date().getFullYear()} &nbsp;
          <a className="text-body" href="https://aryanrai.me/">
            Aryan Rai
          </a>
          . All rights reserved.
        </div>
      </footer>
    </>
  );
}

export default Footer;
