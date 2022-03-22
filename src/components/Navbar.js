import React from 'react'

const Navbar = ({ walletAddress }) => {
  return (
    <header className="xxl bg-img" style={{ backgroundImage: "url(header-bg4.jpg)" }}>
      <nav className="navbar navbar-expand-lg navbar-inverse absolute top-0 left-0 right-0 custom-menu split-menu">
        <div className="container">
          <div className="collapse navbar-collapse" id="navbar-toggle-split-left">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link active inline text-white pl-0" href="#x">
                  <p className="text-white text-bold inline">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M2 20h20v2H2v-2zm2-8h2v7H4v-7zm5 0h2v7H9v-7zm4 0h2v7h-2v-7zm5 0h2v7h-2v-7zM2 7l10-5 10 5v4H2V7zm10 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" fill="rgba(255,255,255,1)" />
                    </svg>
                    DecentralBank
                  </p>
                </a>
              </li>
            </ul>
            {/* / navbar-nav */}
          </div>
          {/* / navbar-collapse */}
          <a className="navbar-brand m-auto" href="#x">
            <img src="assets/images/favicon.png" alt="" />
          </a>
          <div className="collapse navbar-collapse" id="navbar-toggle-split-right">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <p className="font-bold text-white">User:{walletAddress}</p>
              </li>
            </ul>
            {/* / navbar-nav */}
          </div>
          {/* / navbar-collapse */}
        </div>
        {/* / container */}
      </nav>
      {/* / split-navbar */}
      <div className="container text-center">
        <h2 className="page-title">Best UI</h2>
        <h6 className="mb-30">Neumorphism Style UI Kit</h6>
        <p className="lead mb-50 w-50 m-x-auto">
          Aliquam pretium consequat lacinia. In eu ullamcorper tortor, eu sollicitudin sem. Mauris ultricies est ut quam placerat, eget tristique nulla placerat praesent.
        </p>
        <a href="#x" className="btn btn-sm btn-primary pill m-5">
          <i className="fas fa-eye mr-5" /> <span>View</span>
        </a>
        <a href="#x" className="btn btn-sm btn-primary pill m-5">
          <i className="fas fa-download mr-5" /> <span>Dapps</span>
        </a>
      </div>
      {/* / container */}
    </header>
  );
};

export default Navbar
