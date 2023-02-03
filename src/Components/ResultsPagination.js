import React from "react";
import { Pagination } from "@mui/material";
import { paginateResults } from "../utlis";

class ResultsPagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
    };
  }

  handleChange = (event, pageNum) => {
    this.setState({
      currentPage: pageNum,
    });
  };

  render() {
    const postPerPage = 5;
    const [totalPages, resultsShown] = paginateResults(
      this.props.results,
      postPerPage,
      this.state.currentPage
    );
    return (
      <>
        {resultsShown}
        <Pagination
          count={totalPages}
          onChange={this.handleChange}
          siblingCount={0}
          boundaryCount={1}
        />
      </>
    );
  }
}

export default ResultsPagination;
