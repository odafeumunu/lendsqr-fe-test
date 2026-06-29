// src/components/ContentDetail/ContentDetail.tsx
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Star } from "lucide-react";
import { useUserDetail } from "../../hooks/useUser";
import "./ContentDetail.scss";

type Section =
  | "general"
  | "document"
  | "bank_detail"
  | "loan"
  | "saving"
  | "system";

function ContentDetail() {
  const { id } = useParams<{ id: string }>();
  const userId = Number(id);
  const [activeSection, setActiveSection] = useState<Section>("general");

  const { data: user, isLoading, isError, error } = useUserDetail(userId);

  if (isLoading) {
    return (
      <div className="content-body">
        <div className="container">
          <p className="loading-state" role="status">
            Loading user details…
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="content-body">
        <div className="container">
          <p className="error-state" role="alert">
            {error instanceof Error
              ? error.message
              : "Couldn't load this user."}
          </p>
          <Link to="/dashboard" className="back-button">
            <ArrowLeft size={16} />
            back to users
          </Link>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="content-body">
        <div className="container">
          <p className="not-found-state">User not found</p>
          <Link to="/dashboard" className="back-button">
            <ArrowLeft size={16} />
            back to users
          </Link>
        </div>
      </div>
    );
  }

  const guarantor = user.guarantors[0];

  const itemsT = [
    { id: 1, title: "Full Name", content: user.fullName },
    { id: 2, title: "Phone Number", content: user.phone },
    { id: 3, title: "Email Address", content: user.email },
    { id: 4, title: "Bvn", content: user.bvn },
    { id: 5, title: "Gender", content: user.gender },
    { id: 6, title: "Marital Status", content: user.maritalStatus },
    { id: 7, title: "Children", content: user.children },
    { id: 8, title: "Type of residence", content: user.typeOfResidence },
  ];

  const itemsT1 = [
    { id: 1, title: "Level of education", content: user.levelOfEducation },
    { id: 2, title: "Employment status", content: user.employmentStatus },
    { id: 3, title: "Sector of employment", content: user.sectorOfEmployment },
    {
      id: 4,
      title: "Duration of employment",
      content: user.durationOfEmployment,
    },
    { id: 5, title: "Office email", content: user.officeEmail },
    {
      id: 6,
      title: "Monthly income",
      content: `₦${user.monthlyIncome[0].toLocaleString()}.00 - ₦${user.monthlyIncome[1].toLocaleString()}.00`,
    },
    {
      id: 7,
      title: "Loan repayment",
      content: user.loanRepayment.toLocaleString(),
    },
  ];

  const itemsT2 = [
    { id: 1, title: "Twitter", content: user.twitter },
    { id: 2, title: "Facebook", content: user.facebook },
    { id: 3, title: "Instagram", content: user.instagram },
  ];

  const itemsT3 = guarantor
    ? [
        {
          id: 1,
          title: "Full Name",
          content: `${guarantor.firstName} ${guarantor.lastName}`,
        },
        { id: 2, title: "Phone number", content: guarantor.phone },
        { id: 3, title: "Email Address", content: guarantor.email },
        { id: 4, title: "Relationship", content: guarantor.relationship },
      ]
    : [];

  const docs = [
    { id: 1, title: "User id", content: user.id },
    { id: 2, title: "Document", content: "Original" },
  ];

  const banks = [
    { id: 1, title: "Name of bank", content: user.bankName },
    { id: 2, title: "Bvn", content: user.bvn },
    {
      id: 3,
      title: "Account Balance",
      content: `₦${user.accountBalance.toLocaleString()}.00`,
    },
  ];

  const loans1 = [
    {
      id: 1,
      title: "Monthly income",
      content: `₦${user.monthlyIncome[0].toLocaleString()}.00 - ₦${user.monthlyIncome[1].toLocaleString()}.00`,
    },
    {
      id: 2,
      title: "Loan repayment",
      content: user.loanRepayment.toLocaleString(),
    },
  ];

  return (
    <div className="content-body">
      <div className="container">
        <Link to="/dashboard" className="back-button">
          <ArrowLeft size={16} />
          back to users
        </Link>

        <div className="flex-t">
          <p className="user-p">User Details</p>
          <div className="bttt">
            <button className="bttn-1" type="button">
              Blacklist User
            </button>
            <button className="bttn-2" type="button">
              Activate User
            </button>
          </div>
        </div>

        <div className="conT">
          <div className="t-record">
            <div className="txt sll first">
              <img
                className="imgPro"
                src={user.avatarUrl || "/default_image.png"}
                alt={`${user.fullName}'s profile`}
              />
              <div className="inner-txt">
                <h2>{user.username}</h2>
                <p>{user.id}</p>
              </div>
            </div>
            <div className="txt sll" style={{ textAlign: "center" }}>
              <p>User&apos;s Tier</p>
              <div
                className="start-im"
                style={{ marginTop: "10px" }}
                aria-label={`Tier ${user.tier} of 3`}>
                {[1, 2, 3].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    fill={star <= user.tier ? "#E9B200" : "none"}
                    stroke={star <= user.tier ? "#E9B200" : "#E4E4E4"}
                  />
                ))}
              </div>
            </div>
            <div className="txt">
              <h2>₦{user.accountBalance.toLocaleString()}.00</h2>
              <p>
                <span className="bvn-de">{user.bvn}</span> /{" "}
                <span className="bank-name">{user.bankName}</span>
              </p>
            </div>
          </div>

          <div className="nx-details">
            {(
              [
                ["general", "General"],
                ["document", "Documents"],
                ["bank_detail", "Bank Details"],
                ["loan", "Loans"],
                ["saving", "Savings"],
                ["system", "App and System"],
              ] as [Section, string][]
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                className={activeSection === key ? "active" : ""}
                onClick={() => setActiveSection(key)}>
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className={`conT ${activeSection === "general" ? "" : "hidden"}`}>
          <div className="sectt">
            <p className="p-bold">Personal</p>
            <div className="details-sec">
              {itemsT.map((item) => (
                <div key={item.id} className="det-inner">
                  <p className="p-small">{item.title}</p>
                  <p className="p-bold">{item.content}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="sectt">
            <p className="p-bold">Education and Employment</p>
            <div className="details-sec">
              {itemsT1.map((item) => (
                <div key={item.id} className="det-inner">
                  <p className="p-small">{item.title}</p>
                  <p className="p-bold">{item.content}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="sectt">
            <p className="p-bold">Socials</p>
            <div className="details-sec">
              {itemsT2.map((item) => (
                <div key={item.id} className="det-inner">
                  <p className="p-small">{item.title}</p>
                  <p className="p-bold">{item.content}</p>
                </div>
              ))}
            </div>
          </div>
          {itemsT3.length > 0 && (
            <div className="sectt">
              <p className="p-bold">Guarantor</p>
              <div className="details-sec">
                {itemsT3.map((item) => (
                  <div key={item.id} className="det-inner">
                    <p className="p-small">{item.title}</p>
                    <p className="p-bold">{item.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className={`conT ${activeSection === "document" ? "" : "hidden"}`}>
          <div className="sectt">
            <p className="p-bold">Documents Details</p>
            <div className="details-sec">
              {docs.map((doc) => (
                <div key={doc.id} className="det-inner">
                  <p className="p-small">{doc.title}</p>
                  <p className="p-bold">{doc.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className={`conT ${activeSection === "bank_detail" ? "" : "hidden"}`}>
          <div className="sectt">
            <p className="p-bold">Bank Details</p>
            <div className="details-sec">
              {banks.map((bank) => (
                <div key={bank.id} className="det-inner">
                  <p className="p-small">{bank.title}</p>
                  <p className="p-bold">{bank.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={`conT ${activeSection === "loan" ? "" : "hidden"}`}>
          <div className="sectt">
            <p className="p-bold">Loan Details</p>
            <div className="details-sec">
              {loans1.map((loan) => (
                <div key={loan.id} className="det-inner">
                  <p className="p-small">{loan.title}</p>
                  <p className="p-bold">{loan.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={`conT ${activeSection === "saving" ? "" : "hidden"}`}>
          <div className="sectt">
            <p className="p-bold">Saving Details</p>
            <div className="details-sec">
              <div className="det-inner">
                <p className="p-small">Savings</p>
                <p className="p-bold">
                  {user.hasSavings ? "Has active savings" : "No Savings"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={`conT ${activeSection === "system" ? "" : "hidden"}`}>
          <div className="sectt">
            <p className="p-bold">App and System Details</p>
            <div className="details-sec">
              <div className="det-inner">
                <p className="p-small">App</p>
                <p className="p-bold">Mobile</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentDetail;
