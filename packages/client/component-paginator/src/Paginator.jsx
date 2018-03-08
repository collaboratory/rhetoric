import React, { Component } from "react";
import PropTypes from "prop-types";
import { Input } from "@collaboratory/craft-client-component-form";
import uniqid from "uuid/v4";

import {
  PaginatorContainer,
  PaginatorLeft,
  PaginatorRight,
  PaginatorCenter,
  PaginatorPage,
  PaginatorInput
} from "./Styled";

export default class Paginator extends Component {
  static propTypes = {
    onPageChange: PropTypes.func,
    page: PropTypes.number,
    pages: PropTypes.number
  };

  setPage(page) {
    if (!page || isNaN(page)) {
      page = "";
    }

    this.setState({
      page
    });

    if (this.props.onPageChange) {
      return this.props.onPageChange(page);
    }
  }

  onPageInput = e => {
    return this.setPage(parseInt(e.target.value));
  };

  componentWillMount() {
    this.setState({
      page: this.props.page
    });
  }

  render() {
    const left = [];
    const right = [];

    // Populate the pages on the left
    for (let i = 1; i <= Math.min(3, this.props.pages); i++) {
      left.push(i);
    }

    // If there are more than 3 pages, populate the pages on the right
    if (this.props.pages > 3) {
      for (
        let i = Math.max(4, this.props.pages - 3);
        i <= this.props.pages;
        i++
      ) {
        right.push(i);
      }
    }

    return (
      <PaginatorContainer>
        <PaginatorLeft>
          {left.map(num => (
            <PaginatorPage
              key={uniqid()}
              active={num === this.props.page}
              onClick={e => this.setPage(num)}
            >
              {num}
            </PaginatorPage>
          ))}
        </PaginatorLeft>
        <PaginatorCenter>
          {this.props.page > 1 ? (
            <PaginatorPage onClick={e => this.setPage(this.props.page - 1)}>
              Previous
            </PaginatorPage>
          ) : null}
          <PaginatorInput>
            <Input
              size={5}
              type="text"
              align="center"
              value={this.state.page}
              onChange={this.onPageInput}
            />
          </PaginatorInput>
          {this.props.pages > this.props.page ? (
            <PaginatorPage onClick={e => this.setPage(this.props.page + 1)}>
              Next
            </PaginatorPage>
          ) : null}
        </PaginatorCenter>
        <PaginatorRight>
          {right.map(num => (
            <PaginatorPage
              key={uniqid()}
              active={num === this.props.page}
              onClick={e => this.setPage(num)}
            >
              {num}
            </PaginatorPage>
          ))}
        </PaginatorRight>
      </PaginatorContainer>
    );
  }
}
