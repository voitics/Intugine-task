import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import TablePagination from "@material-ui/core/TablePagination";
// import {showDataApi} from "./FetchApi";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(160),
      height: theme.spacing(250),
      flexGrow: 1,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: "#2d3436",
    display: "flex",
    flexDirection: "row",
  },
  paperblock: {
    backgroundColor: "#3742fa",
    display: "flex",
    margin: theme.spacing(1),
    width: theme.spacing(11),
    height: theme.spacing(11),
  },
  paperdiv: {
    marginTop: 30,
    // marginLeft:100,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  papertrack: {
    border: "1px solid #d1ccc0",
    display: "flex",
    // margin: theme.spacing(4),
    width: theme.spacing(50),
    height: "auto",
    // marginTop:'2000'
  },
  tracking: {
    display: "flex",
    margin: theme.spacing(1),
    width: theme.spacing(100),
    height: theme.spacing(70),
    border: "1px solid #d1ccc0",
  },
  flag: {
    position: "absolute",
    right: "47%",
    width: 50,
    height: 50,
    backgroundColor: "#7f8fa6",
    borderRadius: "50%",
  },
  root1: {
    width: "100%",
  },
  container: {
    height: theme.spacing(70),
    maxHeight: theme.spacing(70),
    width: theme.spacing(100),
  },
  container1: {
    marginLeft: -theme.spacing(40),
    height: "auto",
  },
}));

const columns = [
  { id: "name", label: "AWB NO" },
  { id: "code", label: "TRANSPORTER" },
  {
    id: "population",
    label: "SOURCE",
  },
  {
    id: "size",
    label: "DESTINATION",
  },
  {
    id: "density",
    label: "BRAND",
  },
  {
    id: "density",
    label: "START DATE",
  },
  {
    id: "density",
    label: "ETD",
  },
  {
    id: "density",
    label: "STATUS",
  },
];

export default function Dashboard() {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [getDataList, setDataList] = React.useState([]);
  const [getDataListTemp, setDataListTemp] = React.useState([]);
  const [getDEL, setDEL] = React.useState("");
  const [getINT, setINT] = React.useState("");
  const [getOOD, setOOD] = React.useState("");
  const [getDEX, setDEX] = React.useState("");
  const [getNFI, setNFI] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const open = Boolean(anchorEl);
  const [getSCAN, setSCAN] = React.useState([]);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (res) => {
    fetchIntData(res);
    fetchOodData(res);
    fetchDexData(res);
    fetchNfiData(res);
    fetchDelData(res);
  };

  function FetchApi() {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer tTU3gFVUdP");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ email: "shubhamguptasix@gmail.com" });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://f0ztti2nsk.execute-api.ap-south-1.amazonaws.com/v1/consignment/fetch",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setDataList(result);
        setDataListTemp(result);
        handleClick(result);
      })
      .catch((error) => console.log("error", error));
  }

  // console.log("aaaaaaaaaaaa", getDataList);
  const fetchDelData = (res) => {
    var arr = [];
    res.map((item) => {
      if (item.current_status_code === "DEL") arr.push(item);
    });
    setDEL(arr.length);
    setDataListTemp(arr);
  };
  const fetchIntData = (res) => {
    var arr = [];
    res.map((item) => {
      if (item.current_status_code === "INT") arr.push(item);
    });
    setINT(arr.length);
    setDataListTemp(arr);
  };

  // console.log("xcxcxdswrff", getINT);
  const fetchOodData = (res) => {
    var arr = [];
    res.map((item) => {
      if (item.current_status_code === "OOD") arr.push(item);
    });
    setOOD(arr.length);
    setDataListTemp(arr);
  };
  const fetchDexData = (res) => {
    var arr = [];
    res.map((item) => {
      if (item.current_status_code === "DEX") arr.push(item);
    });
    setDEX(arr.length);
    setDataListTemp(arr);
  };
  const fetchNfiData = (res) => {
    var arr = [];
    res.map((item) => {
      if (item.current_status_code === "NFI") arr.push(item);
    });
    setNFI(arr.length);
    setDataListTemp(arr);
  };

  useEffect(function () {
    FetchApi();
    // setContainer(fetchDelData());
  }, []);
  function RightAlignedTimeline() {
    return (
      <Timeline align="left" className={classes.container1}>
        <TimelineItem>
          <TimelineSeparator>
            <img alt="" src="images/destination.svg" className={classes.flag} />
            <TimelineConnector />
          </TimelineSeparator>
        </TimelineItem>
        {getSCAN.map((item, index) => (
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot />
              {index != getSCAN.length - 1 ? <TimelineConnector /> : ""}
            </TimelineSeparator>
            <TimelineContent>
              {item.location} {item.time}
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    );
  }

  return (
    <div className={classes.root}>
      <Paper variant="outlined">
        <AppBar position="static" style={{ backgroundColor: "#ffffff" }}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              <img
                alt=""
                src="images/logo.svg"
                style={{ width: 40, height: 40 }}
              />
              &nbsp;
              <text style={{ fontSize: 13, color: "#2d3436", marginTop: 7 }}>
                <b>Intugine</b>
              </text>
            </Typography>
            {
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="#2d3436"
                >
                  <AccountCircle style={{ height: 40, width: 40 }} />
                  &nbsp;
                  <KeyboardArrowDownIcon />
                </IconButton>

                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                </Menu>
              </div>
            }
          </Toolbar>
        </AppBar>
        <div className={classes.paperdiv}>
          <div>
            <Paper
              variant="outlined"
              className={classes.paperblock}
              onClick={() => fetchDelData(getDataList)}
            >
              <h5 style={{ color: "white", marginTop: 7, marginLeft: 10 }}>
                DEL
              </h5>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <h5
                style={{
                  color: "white",
                  marginTop: 50,
                  fontSize: 30,
                  fontWeight: 10,
                  marginLeft: -25,
                }}
              >
                {getDEL}
              </h5>
            </Paper>
          </div>
          <div>
            <Paper
              variant="outlined"
              className={classes.paperblock}
              onClick={() => fetchIntData(getDataList)}
            >
              <h5 style={{ color: "white", marginTop: 7, marginLeft: 10 }}>
                INT
              </h5>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <h5
                style={{
                  color: "white",
                  marginTop: 50,
                  fontSize: 30,
                  fontWeight: 10,
                  marginLeft: -20,
                }}
              >
                {getINT}
              </h5>
            </Paper>
          </div>
          <div>
            <Paper
              variant="outlined"
              className={classes.paperblock}
              onClick={() => fetchOodData(getDataList)}
            >
              <h5 style={{ color: "white", marginTop: 7, marginLeft: 10 }}>
                OOD
              </h5>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <h5
                style={{
                  color: "white",
                  marginTop: 50,
                  fontSize: 30,
                  fontWeight: 10,
                  marginLeft: -20,
                }}
              >
                {getOOD}
              </h5>
            </Paper>
          </div>
          <div>
            <Paper
              variant="outlined"
              className={classes.paperblock}
              onClick={() => fetchDexData(getDataList)}
            >
              <h5 style={{ color: "white", marginTop: 7, marginLeft: 10 }}>
                DEX
              </h5>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <h5
                style={{
                  color: "white",
                  marginTop: 50,
                  fontSize: 30,
                  fontWeight: 10,
                  marginLeft: -20,
                }}
              >
                {getDEX}
              </h5>
            </Paper>
          </div>
          <div>
            <Paper
              variant="outlined"
              className={classes.paperblock}
              onClick={() => fetchNfiData(getDataList)}
            >
              <h5 style={{ color: "white", marginTop: 7, marginLeft: 10 }}>
                NFI
              </h5>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <h5
                style={{
                  color: "white",
                  marginTop: 50,
                  fontSize: 30,
                  fontWeight: 10,
                  marginLeft: -20,
                }}
              >
                {getNFI}
              </h5>
            </Paper>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ marginTop: 60, marginLeft: 30 }}>
            <Paper variant="outlined" square className={classes.papertrack}>
              {RightAlignedTimeline()}
            </Paper>
          </div>
          <div style={{ marginTop: 20, marginLeft: 30 }}>
            <Paper variant="outlined" square className={classes.tracking}>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                <Paper className={classes.root1}>
                  <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          {columns.map((column) => (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{ minWidth: column.minWidth }}
                            >
                              {column.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {getDataListTemp
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((row) => {
                            var expected_delivery_date = "Not Exist";
                            try {
                              expected_delivery_date =
                                row.extra_fields.expected_delivery_date;
                            } catch (e) {
                              console.log(e);
                            }

                            return (
                              <TableRow
                                onClick={() => {
                                  try {
                                    if (row.scan.length) {
                                      setSCAN(row.scan);
                                    }
                                  } catch (error) {
                                    console.log(error);
                                  }
                                }}
                                hover
                                role="checkbox"
                                tabIndex={-1}
                                key={row.code}
                              >
                                <TableCell>{row.awbno}</TableCell>
                                <TableCell>{row.carrier}</TableCell>
                                <TableCell>{row.from}</TableCell>
                                <TableCell>{row.to}</TableCell>
                                <TableCell>{row.carrier}</TableCell>
                                <TableCell>{row.pickup_date}</TableCell>
                                <TableCell>{expected_delivery_date}</TableCell>
                                <TableCell>{row.current_status}</TableCell>
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={getDataListTemp.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                  />
                </Paper>
              </div>
            </Paper>
          </div>
        </div>
      </Paper>
    </div>
  );
}
