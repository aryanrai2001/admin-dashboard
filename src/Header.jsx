function Header() {
  return (
    <>
      <nav className="bg-secondary-subtle navbar navbar-dark p-3">
        <a className="navbar-brand" href="#">
          <img
            src="/favicon.svg"
            width="50"
            height="50"
            className="header-logo d-inline-block align-middle"
            alt="Dashboard Logo"
          />
          <h2 className="m-4 d-inline align-middle">Admin Dashboard</h2>
        </a>
      </nav>
    </>
  );
}

export default Header;
