import React from "react";

function CreateTicket() {
  return (
    <div className="container">
      <div className="row p-5 mt-5 mb-5">
        <h1 className="fs-2">To create a ticket, select a relevant topic</h1>
        <div className="col-4 p-5 mt-2 mb-2">
          <h4 className="">
            <i class="fa fa-plus-circle" aria-hidden="true"></i> Account Opening
          </h4>
          <a href="https://support.zerodha.com/category/account-opening/resident-individual" target="_blank" rel="noreferrer" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Resident Individual
          </a>
          <br />
          <a href="https://support.zerodha.com/category/account-opening/minor" target="_blank" rel="noreferrer" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Minor
          </a>
          <br />
          <a href="https://support.zerodha.com/category/account-opening/nri-account-opening" target="_blank" rel="noreferrer" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Non Resident Indian (NRI)
          </a>
          <br />
          <a href="https://support.zerodha.com/category/account-opening/company-partnership-and-huf-account-opening" target="_blank" rel="noreferrer" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Company, Partnership, HUF and LLP
          </a>
          <br />
          <a href="https://support.zerodha.com/category/account-opening/glossary" target="_blank" rel="noreferrer" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Glossary
          </a>
          <br />
        </div>
        <div className="col-4 p-5 mt-2 mb-2">
          <h4 className="">
            <i class="fa fa-plus-circle" aria-hidden="true"></i> Your Zerodha Account
          </h4>
          <a href="https://support.zerodha.com/category/your-zerodha-account/your-profile" target="_blank" rel="noreferrer" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Your Profile
          </a>
          <br />
          <a href="https://support.zerodha.com/category/your-zerodha-account/account-modification-and-segment-addition" target="_blank" rel="noreferrer" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Account Modification
          </a>
          <br />
          <a href="https://support.zerodha.com/category/your-zerodha-account/dp-id-and-bank-details" target="_blank" rel="noreferrer" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Client Master Report (CMR) and DP
          </a>
          <br />
          <a href="https://support.zerodha.com/category/your-zerodha-account/nomination-process" target="_blank" rel="noreferrer" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Nomination
          </a>
          <br />
          <a href="https://support.zerodha.com/category/your-zerodha-account/transfer-of-shares-and-conversion-of-shares" target="_blank" rel="noreferrer" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Transfer and Conversion of Securities
          </a>
          <br />
        </div>
        <div className="col-4 p-5 mt-2 mb-2">
          <h4 className="">
            <i class="fa fa-plus-circle" aria-hidden="true"></i> Kite
          </h4>
          <a href="https://support.zerodha.com/category/trading-and-markets/ipo" target="_blank" rel="noreferrer" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            IPO
          </a>
          <br />
          <a href="https://support.zerodha.com/category/trading-and-markets/trading-faqs" target="_blank" rel="noreferrer" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Trading FAQs
          </a>
          <br />
          <a href="https://support.zerodha.com/category/trading-and-markets/margins" target="_blank" rel="noreferrer" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            MTF and Margins
          </a>
          <br />
          <a href="https://support.zerodha.com/category/trading-and-markets/charts-and-orders" target="_blank" rel="noreferrer" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Charts and Orders
          </a>
          <br />
          <a href="https://support.zerodha.com/category/trading-and-markets/alerts-and-nudges" target="_blank" rel="noreferrer" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Alerts and Nudges
          </a>
          <br />
          <a href="https://support.zerodha.com/category/trading-and-markets/general-kite" target="_blank" rel="noreferrer" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            General
          </a>
          <br />
        </div>
        <div className="col-4 p-5 mt-2 mb-2">
          <h4 className="">
            <i class="fa fa-plus-circle" aria-hidden="true"></i> Funds
          </h4>
          <a href="https://support.zerodha.com/category/funds/adding-funds" target="_blank" rel="noreferrer" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Add Money
          </a>
          <br />
          <a href="https://support.zerodha.com/category/funds/fund-withdrawal" target="_blank" rel="noreferrer" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Withdraw Money
          </a>
          <br />
          <a href="https://support.zerodha.com/category/funds/adding-bank-accounts" target="_blank" rel="noreferrer" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Add Bank Accounts
          </a>
          <br />
          <a href="https://support.zerodha.com/category/funds/mandate" target="_blank" rel="noreferrer" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            eMandates
          </a>
          <br />
        </div>
        <div className="col-4 p-5 mt-2 mb-2">
          <h4 className="">
            <i class="fa fa-plus-circle" aria-hidden="true"></i> Console
          </h4>
          <a href="https://support.zerodha.com/category/console/portfolio" target="_blank" rel="noreferrer" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Portfolio
          </a>
          <br />
          <a href="https://support.zerodha.com/category/console/corporate-actions" target="_blank" rel="noreferrer" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Corporate Actions
          </a>
          <br />
          <a href="https://support.zerodha.com/category/console/ledger" target="_blank" rel="noreferrer" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Funds Statement
          </a>
          <br />
          <a href="https://support.zerodha.com/category/console/reports" target="_blank" rel="noreferrer" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Reports
          </a>
          <br />
          <a href="https://support.zerodha.com/category/console/profile" target="_blank" rel="noreferrer" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Profile
          </a>
          <br />
          <a href="https://support.zerodha.com/category/console/segments" target="_blank" rel="noreferrer" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Segments
          </a>
          <br />
        </div>
        <div className="col-4 p-5 mt-2 mb-2">
          <h4 className="">
            <i class="fa fa-plus-circle" aria-hidden="true"></i> Coin
          </h4>
          <a href="https://support.zerodha.com/category/mutual-funds/understanding-mutual-funds" target="_blank" rel="noreferrer" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Mutual Funds
          </a>
          <br />
          <a href="https://support.zerodha.com/category/mutual-funds/nps" target="_blank" rel="noreferrer" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            National Pension Scheme (NPS)
          </a>
          <br />
          <a href="https://support.zerodha.com/category/mutual-funds/fixed-deposits" target="_blank" rel="noreferrer" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Fixed Deposit (FD)
          </a>
          <br />
          <a href="https://support.zerodha.com/category/mutual-funds/features-on-coin" target="_blank" rel="noreferrer" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Features on Coin
          </a>
          <br />
          <a href="https://support.zerodha.com/category/mutual-funds/payments-and-orders" target="_blank" rel="noreferrer" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Payments and Orders
          </a>
          <br />
          <a href="https://support.zerodha.com/category/mutual-funds/coin-general" target="_blank" rel="noreferrer" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            General
          </a>
          <br />
        </div>
      </div>
    </div>
  );
}

export default CreateTicket;
