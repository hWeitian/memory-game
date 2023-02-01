import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Grid,
  Menu,
  MenuItem,
  Tooltip,
  Zoom,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import CustomButton from "./CustomButton/CustomButton";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorElNav: null,
    };
  }

  handleOpenNavMenu = (event) => {
    this.setState({
      anchorElNav: event.currentTarget,
    });
  };

  handleCloseNavMenu = () => {
    this.setState({
      anchorElNav: null,
    });
  };

  handleDisplayModal = (source) => {
    this.props.displayModal(source);
  };

  handleMobileMenuClick = (source) => {
    this.handleCloseNavMenu();

    this.handleDisplayModal(source);
  };

  render() {
    return (
      <>
        <AppBar
          position="static"
          sx={{ backgroundColor: "#FFFFFF", boxShadow: "0" }}
        >
          <Container maxWidth="xl" sx={{ justifyContent: "space-between" }}>
            <Toolbar disableGutters>
              <Grid
                container
                sx={{ justifyContent: "space-between", alignItems: "center" }}
              >
                <Grid item>
                  <Typography
                    noWrap
                    sx={{
                      mr: 2,
                      flexGrow: 1,
                      fontWeight: 700,
                      color: "#152938",
                      textTransform: "uppercase",
                      fontSize: { xs: "1.25rem", sm: "1.5rem" },
                    }}
                  >
                    Memory Game
                  </Typography>
                </Grid>

                <Grid item>
                  <Box
                    sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" } }}
                  >
                    <Grid
                      container
                      sx={{
                        justifyContent: "space-between",
                        gap: 1,
                        alignItems: "center",
                      }}
                    >
                      <Grid item>
                        <CustomButton
                          className="btn btn-orange"
                          style={{ width: "8rem" }}
                          onClick={() => this.handleDisplayModal("reset-game")}
                        >
                          New Game
                        </CustomButton>
                      </Grid>
                      <Grid item>
                        <CustomButton
                          className="btn btn-light-blue"
                          style={{ width: "8rem" }}
                          onClick={() =>
                            this.handleDisplayModal("results-navbar")
                          }
                        >
                          Results
                        </CustomButton>
                      </Grid>
                      <Grid item>
                        <Tooltip
                          TransitionComponent={Zoom}
                          title="Restart Level"
                        >
                          <IconButton
                            aria-label="mobile menu"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={() =>
                              this.handleDisplayModal("reset-round")
                            }
                            sx={{
                              color: "#304859",
                              padding: 0,
                            }}
                          >
                            <RestartAltIcon style={{ fontSize: 38 }} />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                      <Grid item>
                        <Tooltip TransitionComponent={Zoom} title="Rules">
                          <IconButton
                            aria-label="mobile menu"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={() => this.handleDisplayModal("rules")}
                            sx={{
                              color: "#304859",
                              padding: 0,
                            }}
                          >
                            <HelpOutlineIcon style={{ fontSize: 38 }} />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </Box>

                  <Box
                    sx={{ flexGrow: 0, display: { xs: "flex", sm: "none" } }}
                  >
                    <IconButton
                      size="large"
                      aria-label="mobile menu"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={this.handleOpenNavMenu}
                      sx={{ color: "#FDA214", padding: 0 }}
                    >
                      <MenuIcon style={{ fontSize: 30 }} />
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={this.state.anchorElNav}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(this.state.anchorElNav)}
                      onClose={this.handleCloseNavMenu}
                      sx={{
                        display: { xs: "block", md: "none" },
                      }}
                    >
                      <MenuItem
                        onClick={() => this.handleMobileMenuClick("reset-game")}
                      >
                        <Typography textAlign="center">New Game</Typography>
                      </MenuItem>
                      <MenuItem
                        onClick={() =>
                          this.handleMobileMenuClick("reset-round")
                        }
                      >
                        <Typography textAlign="center">Reset</Typography>
                      </MenuItem>
                      <MenuItem
                        onClick={() =>
                          this.handleMobileMenuClick("results-navbar")
                        }
                      >
                        <Typography textAlign="center">Results</Typography>
                      </MenuItem>
                      <MenuItem
                        onClick={() => this.handleMobileMenuClick("rules")}
                      >
                        <Typography textAlign="center">Rules</Typography>
                      </MenuItem>
                    </Menu>
                  </Box>
                </Grid>
              </Grid>
            </Toolbar>
          </Container>
        </AppBar>
      </>
    );
  }
}

export default Header;
