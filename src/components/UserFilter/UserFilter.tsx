// import { useState, ChangeEvent, FormEvent } from "react";
// import Header from "../HeaderComp/Header";
// import Sidebar from "../SidebarComp/Sidebar";
// import Content from "../ContentComp/Content";
// import { Helmet } from "react-helmet";
// import Generated from "../mockData/Generated.json";
// import { User } from "../mockData/type.tsx";
// import "./UserFilter.scss";

// // Define the form data type
// interface FormData {
//   organisation: string;
//   username: string;
//   email: string;
//   phone: string;
//   status: string;
// }

// function UserFilter() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
//   const [filteredUsers, setFilteredUsers] = useState<User[]>([]); // Correctly type filteredUsers as User[]
//   const [formData, setFormData] = useState<FormData>({
//     organisation: "",
//     username: "",
//     email: "",
//     phone: "",
//     status: "",
//   });
//   const [showFilter, setShowFilter] = useState<boolean>(true);

//   // Alert state
//   const [alertMessage, setAlertMessage] = useState<string | null>(null);
//   const [showAlert, setShowAlert] = useState<boolean>(false);

//   // Toggle sidebar visibility
//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   // Handle form input changes
//   const handleChange = (
//     e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle form submission (filtering the users)
//   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const { organisation, username, email, phone, status } = formData;

//     // Filter the generated users based on form data
//     const filtered = Generated.filter((user: User) => {
//       const orgMatch = organisation
//         ? user.organisation.toLowerCase() === organisation.toLowerCase()
//         : true;
//       const userMatch = username
//         ? user.username.toLowerCase() === username.toLowerCase()
//         : true;
//       const emailMatch = email
//         ? user.email.toLowerCase() === email.toLowerCase()
//         : true;
//       const phoneMatch = phone ? user.phone === phone : true;
//       const statusMatch = status
//         ? user.status.toLowerCase() === status.toLowerCase()
//         : true;

//       return orgMatch && userMatch && emailMatch && phoneMatch && statusMatch;
//     });

//     if (filtered.length > 0) {
//       setFilteredUsers(filtered);
//       setShowFilter(false); // Hide the filter form once users are found
//       setAlertMessage(null); // Clear alert message if users are found
//       setShowAlert(false); // Hide the alert
//     } else {
//       setFilteredUsers([]);
//       setAlertMessage(
//         "No users found with the specified criteria. Please check your filters and try again."
//       );
//       setShowAlert(true); // Show custom alert
//     }
//   };

//   return (
//     <>
//       <Helmet>
//         <title>Landsqr Assessment || User Filter</title>
//       </Helmet>
//       <div className="dashboard">
//         <Header toggleSidebar={toggleSidebar} />
//         <Sidebar isOpen={isSidebarOpen} />
//         <Content filteredUsers={filteredUsers}>
//           <div className="form-filter">
//             {showFilter && (
//               <form onSubmit={handleSubmit}>
//                 <label htmlFor="organisation">Organisation</label>
//                 <select
//                   id="organisation"
//                   name="organisation"
//                   onChange={handleChange}
//                   value={formData.organisation}>
//                   <option value="">Select</option>
//                   <option value="Pawnagra">Pawnagra</option>
//                   <option value="Miracula">Miracula</option>
//                 </select>

//                 <label htmlFor="username">Username</label>
//                 <input
//                   id="username"
//                   name="username"
//                   type="text"
//                   placeholder="Username"
//                   onChange={handleChange}
//                   value={formData.username}
//                 />

//                 <label htmlFor="email">Email</label>
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   placeholder="Email"
//                   onChange={handleChange}
//                   value={formData.email}
//                 />

//                 <label htmlFor="phone">Phone Number</label>
//                 <input
//                   id="phone"
//                   name="phone"
//                   type="text"
//                   placeholder="Phone Number"
//                   onChange={handleChange}
//                   value={formData.phone}
//                 />

//                 <label htmlFor="status">Status</label>
//                 <select
//                   id="status"
//                   name="status"
//                   onChange={handleChange}
//                   value={formData.status}>
//                   <option value="">Select</option>
//                   <option value="active">Active</option>
//                   <option value="inactive">Inactive</option>
//                   <option value="blacklist">Blacklist</option>
//                   <option value="pending">Pending</option>
//                 </select>

//                 <div className="but-btn">
//                   <button
//                     className="btn-1"
//                     type="reset"
//                     onClick={() => {
//                       setFilteredUsers([]);
//                       setFormData({
//                         organisation: "",
//                         username: "",
//                         email: "",
//                         phone: "",
//                         status: "",
//                       }); // Reset form
//                     }}>
//                     Reset
//                   </button>
//                   <button className="btn-2" type="submit">
//                     Filter
//                   </button>
//                 </div>
//               </form>
//             )}

//             {!showFilter && (
//               <button
//                 onClick={() => setShowFilter(true)}
//                 className="show-filter-btn">
//                 Show Filter
//               </button>
//             )}

//             {/* Custom alert */}
//             {showAlert && (
//               <div className="custom-alert">
//                 <div className="alert-box">
//                   <p>{alertMessage}</p>
//                   <button onClick={() => setShowAlert(false)}>Close</button>
//                 </div>
//               </div>
//             )}
//           </div>

          
//         </Content>
//       </div>
//     </>
//   );
// }

// export default UserFilter;
