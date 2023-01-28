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
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import MenuIcon from "@mui/icons-material/Menu";
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
    console.log("click");
    this.handleCloseNavMenu();

    if (source === "reset-game") {
      this.props.resetGame();
    } else {
      this.props.displayModal(source);
    }
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
                          onClick={this.props.resetGame}
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
                      <Grid item sx={{}}>
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
                          <InfoIcon style={{ fontSize: 38 }} />
                        </IconButton>
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
