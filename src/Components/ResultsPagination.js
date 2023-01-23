import React from "react";
import { Pagination } from "@mui/material";
import ResultsRow from "./ResultsRow/ResultsRow";

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
    const totalPages = Math.ceil(this.props.results.length / postPerPage);
    const lastResultsIndex = this.state.currentPage * postPerPage;
    const firstResultsIndex = lastResultsIndex - postPerPage;
    const resultsShown = this.props.results.slice(
      firstResultsIndex,
      lastResultsIndex
    );
    return (
      <>
        {resultsShown}
        <Pagination count={totalPages} onChange={this.handleChange} />
      </>
    );
  }
}

export default ResultsPagination;
