import React, { Fragment, useState } from "react";
import { Button, Dropdown, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SRLWrapper } from "simple-react-lightbox";
//** Import Image */
import profile01 from "../../../../images/profile/1.jpg";
import profile02 from "../../../../images/profile/2.jpg";
import profile03 from "../../../../images/profile/3.jpg";
import profile04 from "../../../../images/profile/4.jpg";
import profile05 from "../../../../images/profile/5.jpg";
import profile06 from "../../../../images/profile/6.jpg";
import profile07 from "../../../../images/profile/7.jpg";
import profile from "../../../../images/profile/profile.png";
import PageTitle from "../../../layouts/PageTitle";
import AppProfileAboutMe from "./AppProfileAboutMe";
import AppProfilePosts from "./AppProfilePosts";
import AppProfileSetting from "./AppProfileSetting";

const AppProfile = () => {
	const user = useSelector(({ auth }) => auth.user);
  const [activeToggle, setActiveToggle] = useState("posts");
  const [sendMessage, setSendMessage] = useState(false);
  const options = {
    settings: {
      overlayColor: "#000000",
    },
  };
  return (
    <Fragment>
      <PageTitle activeMenu="Profile" motherMenu="App" />

      <div className="row">
        <div className="col-lg-12">
          <div className="profile card card-body px-3 pt-3 pb-0">
            <div className="profile-head">
              <div className="photo-content ">
                <div className="cover-photo rounded"></div>
              </div>
              <div className="profile-info">
                <div className="profile-photo">
                  <img
                    src={profile}
                    className="img-fluid rounded-circle"
                    alt="profile"
                  />
                </div>
                <div className="profile-details">
                  <div className="profile-name px-3 pt-2">
                    <h4 className="text-primary mb-0">{user.fullname}</h4>
                    <p>UX / UI Designer</p>
                  </div>
                  <div className="profile-email px-2 pt-2">
                    <h4 className="text-muted mb-0">{user.email}</h4>
                    <p>Email</p>
                  </div>
                  <Dropdown className="dropdown ms-auto">
                    <Dropdown.Toggle
                      variant="primary"
                      className="btn btn-primary light sharp i-false"
                      data-toggle="dropdown"
                      aria-expanded="true"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        //    xmlns:xlink="http://www.w3.org/1999/xlink"
                        width="18px"
                        height="18px"
                        viewBox="0 0 24 24"
                        version="1.1"
                      >
                        <g
                          stroke="none"
                          strokeWidth="1"
                          fill="none"
                          fillRule="evenodd"
                        >
                          <rect x="0" y="0" width="24" height="24"></rect>
                          <circle fill="#000000" cx="5" cy="12" r="2"></circle>
                          <circle fill="#000000" cx="12" cy="12" r="2"></circle>
                          <circle fill="#000000" cx="19" cy="12" r="2"></circle>
                        </g>
                      </svg>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu dropdown-menu-right">
                      <Dropdown.Item className="dropdown-item">
                        <i className="fa fa-user-circle text-primary me-2" />
                        View profile
                      </Dropdown.Item>
                      <Dropdown.Item className="dropdown-item">
                        <i className="fa fa-users text-primary me-2" />
                        Add to close friends
                      </Dropdown.Item>
                      <Dropdown.Item className="dropdown-item">
                        <i className="fa fa-plus text-primary me-2" />
                        Add to group
                      </Dropdown.Item>
                      <Dropdown.Item className="dropdown-item">
                        <i className="fa fa-ban text-primary me-2" />
                        Block
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-4">
					<div className="row">
						<div className="col-lg-12">
							<div className="card">
								<div className="card-body">
									<div className="profile-statistics">
										<div className="text-center">
											<div className="row">
												<div className="col">
													<h3 className="m-b-0">150</h3><span>Follower</span>
												</div>
												<div className="col">
													<h3 className="m-b-0">140</h3> <span>Place Stay</span>
												</div>
												<div className="col">
													<h3 className="m-b-0">45</h3> <span>Reviews</span>
												</div>
											</div>
											<div className="mt-4">
												<Link	to="/post-details"	className="btn btn-primary mb-1 me-1">Follow</Link>
												<Button as="a" href="#" className="btn btn-primary mb-1 ms-1" onClick={() => setSendMessage(true)}>Send Message</Button>
											</div>
										</div>
										{/* send Modal */}
										<Modal className="modal fade" show={sendMessage}>
											<div className="modal-content">
												<div className="modal-header">
													<h5 className="modal-title">Send Message</h5>
													<Button variant="" type="button" className="btn-close" data-dismiss="modal" onClick={() => setSendMessage(false)}>
														
													</Button>
												</div>
												<div className="modal-body">
													<form className="comment-form" onSubmit={(e) => { e.preventDefault(); setSendMessage(false); }}>
														<div className="row">
															<div className="col-lg-6">
																<div className="form-group mb-3">
																	<label htmlFor="author" className="text-black font-w600">  Name <span className="required">*</span> </label>
																	<input type="text" className="form-control" defaultValue="Author" name="Author" placeholder="Author" />
																</div>
															</div>
															<div className="col-lg-6">
																<div className="form-group mb-3">
																	<label htmlFor="email" className="text-black font-w600"> Email <span className="required">*</span></label>
																	<input type="text" className="form-control" defaultValue="Email" placeholder="Email" name="Email"/>
																</div>
															</div>
															<div className="col-lg-12">
																<div className="form-group mb-3">
																	<label htmlFor="comment" className="text-black font-w600">Comment</label>
																	<textarea rows={8} className="form-control" name="comment" placeholder="Comment" defaultValue={""}/>
																</div>
															</div>
															<div className="col-lg-12">
																<div className="form-group mb-3">
																	<input type="submit" value="Post Comment" className="submit btn btn-primary" name="submit"/>
																</div>
															</div>
														</div>
													</form>
												</div>
											</div>
										</Modal>
									</div>
								</div>
							</div>
						</div>	
						<div className="col-lg-12">
							<div className="card">
								<div className="card-header border-0 pb-0">
									<h5 className="text-primary">Today Highlights</h5>
								</div>	
								<div className="card-body pt-3"	>	
									<div className="profile-blog ">
										<img  src={profile01}  alt="profile" className="img-fluid  mb-4 w-100 " />
										<Link to="/post-details"> <h4>Darwin Creative Agency Theme</h4> </Link>
										<p className="mb-0">
											A small river named Duden flows by their place and supplies
											it with the necessary regelialia. It is a paradisematic
											country, in which roasted parts of sentences fly into your
											mouth.
										</p>
									</div>
								</div>	
							</div>
						</div>
						<div className="col-lg-12">
							<div className="card">
								<div className="card-header border-0 pb-0">
									<h5 className="text-primary ">Interest</h5>
								</div>
								<div className="card-body pt-3">
									<div className="profile-interest ">
										<SRLWrapper options={options}>
											<div className="row sp4">
												<div className="col-lg-4 col-xl-4 col-sm-4 col-6 int-col mb-1">
													<a href={profile02}> <img src={profile02} alt="profileImage" className="img-fluid" /> </a>
												</div>
												<div className="col-lg-4 col-xl-4 col-sm-4 col-6 int-col mb-1">
													<a href={profile03}> <img src={profile03} alt="profile" className="img-fluid"/></a>
												</div>
												<div className="col-lg-4 col-xl-4 col-sm-4 col-6 int-col mb-1">
													<a href={profile04}><img src={profile04} alt="profile" className="img-fluid" /> </a>
												</div>
												<div className="col-lg-4 col-xl-4 col-sm-4 col-6 int-col mb-1">
													{" "}
													<a href={profile02}><img src={profile02} alt="profile" className="img-fluid" /> </a>
												</div>
												<div className="col-lg-4 col-xl-4 col-sm-4 col-6 int-col mb-1">
													<a href={profile03} className="col-lg-4 col-xl-4 col-sm-4 col-6 int-col" >
														<img src={profile03} alt="profile"	className="img-fluid"/>	
													</a>
												</div>
												<div className="col-lg-4 col-xl-4 col-sm-4 col-6 int-col mb-1">
													<a href={profile04}	className="col-lg-4 col-xl-4 col-sm-4 col-6 int-col">
														<img  src={profile04} alt="profile"	className="img-fluid"/>
													</a>
												</div>
											</div>
										</SRLWrapper>
									</div>
								</div>	
							</div>
						</div>	
						<div className="col-lg-12">
							<div className="card">
								<div className="card-header border-0 pb-0">
									<h5 className="text-primary">Our Latest News</h5>
								</div>	
								<div className="card-body pt-3">
									<div className="profile-news">
										<div className="media pt-3 pb-3">
										<img src={profile05} alt="" className="me-3 rounded" width={75}/>
										<div className="media-body">
											<h5 className="m-b-5">
												<Link to="/post-details" className="text-black">
													Collection of textile samples
												</Link>
											</h5>
											<p className="mb-0">I shared this on my fb wall a few months back, and I thought. </p>
										</div>
										</div>
										<div className="media pt-3 pb-3">
										<img src={profile06} alt=""  className="me-3 rounded" width={75}/>
										<div className="media-body">
											<h5 className="m-b-5">
												<Link to="/post-details" className="text-black">
												Collection of textile samples
												</Link>
											</h5>
											<p className="mb-0">
												I shared this on my fb wall a few months back, and I
												thought.
											</p>
										</div>
										</div>
										<div className="media pt-3 ">
										<img src={profile07} alt="" className="me-3 rounded" width={75} />
										<div className="media-body">
											<h5 className="m-b-5">
												<Link to="/post-details" className="text-black">
													Collection of textile samples
												</Link>
											</h5>
											<p className="mb-0">
												I shared this on my fb wall a few months back, and I thought.
											</p>
										</div>
										</div>
									</div>
								</div>	
							</div>
						</div>	
					</div>	
				</div>	
        <div className="col-xl-8">
          <div className="card">
            <div className="card-body">
              <div className="profile-tab">
                <div className="custom-tab-1">
									<ul className="nav nav-tabs">
										<li className="nav-item" onClick={() => setActiveToggle("posts")}>
											<Link to="#my-posts" data-toggle="tab" className={`nav-link ${ activeToggle === "posts" ? "active show" : ""}`}>Posts</Link>
										</li>
										<li className="nav-item" onClick={() => setActiveToggle("aboutMe")}>
											<Link to="#about-me"  data-toggle="tab" className={`nav-link ${ activeToggle === "aboutMe" ? "active show" : ""}`}>About Me</Link>
										</li>
										<li className="nav-item">
											<Link to="#profile-settings" data-toggle="tab" onClick={() => setActiveToggle("setting")} className={`nav-link ${ activeToggle === "setting" ? "active show" : ""}`}>Setting</Link>
										</li>
									</ul>
									<div className="tab-content">
										<div id="my-posts" className={`tab-pane fade ${ activeToggle === "posts" ? "active show" : "" }`} >
											<AppProfilePosts />
										</div>
										<div id="about-me" className={`tab-pane fade ${ activeToggle === "aboutMe" ? "active show" : ""}`}>
											<AppProfileAboutMe />
										</div>
										<div id="profile-settings" className={`tab-pane fade ${ activeToggle === "setting" ? "active show" : ""}`}>
											<AppProfileSetting />
										</div>
									</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AppProfile;
