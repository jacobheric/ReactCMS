import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { slashDomain } from '../../utils';

import NotFound from '../../components/NotFound';
import Header from '../../components/Parts/Header';
import Content from '../../components/Parts/Content';
import Sidebar from '../../components/Parts/Sidebar';
import Footer from '../../components/Parts/Footer';

import Signin from './Signin';
import FrontPage from './FrontPage';
import Post from './Post';
import Tag from './Tag';
import { Animation } from "./Animation";

class Contents extends Component {
  render() {
    const {
      match: { params },
      site: { header, top_content, bottom_content, left_sidebar, right_sidebar, footer },
    } = this.props;
    const slashDomainVal = slashDomain(params.domain);

    let content_cols, left_sidebar_cols, right_sidebar_cols;
    if ( left_sidebar.length && right_sidebar.length ) {
      content_cols = 7;
      left_sidebar_cols = 2;
      right_sidebar_cols = 3;
    } else if ( left_sidebar.length && !right_sidebar.length ) {
      content_cols = 9;
      left_sidebar_cols = 3;
    } else if ( !left_sidebar.length && right_sidebar.length ) {
      content_cols = 9;
      right_sidebar_cols = 3;
    } else {
      content_cols = 12;
    }

    return (
      <Grid container spacing={8}>
        <Header widgets={header} />

        <Grid container justify="center">
          <Animation />
        </Grid>

        <Sidebar colNum={left_sidebar_cols} widgets={left_sidebar} />

        <Grid item xs={12} md={content_cols}>
          <Content widgets={top_content} />

          <div id="content">
            <Switch>
              <Route exact path={`${slashDomainVal}/signin`} component={Signin} />
              <Route exact path={`${slashDomainVal}/`} component={FrontPage} />

              <Route exact path={`${slashDomainVal}/blog/:year/:month/:day/:slug`}
                render={props => {
                  const { params: { year, month, day, slug } } = props.match;
                  return <Post type="post" key={`${year}-${month}-${day}-${slug}`} {...props} />;
                }}
              />
              <Route exact path={`${slashDomainVal}/blog/:type/:slug`}
                render={props => {
                  const { params: { type, slug } } = props.match;
                  return <Tag type={type} key={`${type}-${slug}`} {...props} />;
                }}
              />
              <Route exact path={`${slashDomainVal}/:slug`}
                render={props => {
                  const { params: { slug } } = props.match;
                  return <Post type="page" key={`page-${slug}`} {...props} />;
                }}
              />

              <Route component={NotFound} />
            </Switch>
          </div>

          <Content widgets={bottom_content} />
        </Grid>

        <Sidebar colNum={right_sidebar_cols} widgets={right_sidebar} />

        <Footer widgets={footer} />
      </Grid>
    );
  }
}

Contents.propTypes = {
  match: PropTypes.object.isRequired,
  site: PropTypes.object.isRequired,
}

function mapStateToProps({ sites, info: { domain } }) {
  return { site: sites[domain] };
}

export default connect(mapStateToProps)(Contents);
