
import React, { PropTypes, Component } from 'react';
import cx from 'classnames';
import _ from 'lodash';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ProductList.css';
import Link from '../Link';

class ProductList extends Component {
  static propTypes = {
    isFetching: PropTypes.bool,
    rs: PropTypes.array,
  };

  static defaultProps = {
    isFetching: true,
    rs: [],
  };

  constructor() {
    super();
    this.renderRow = this.renderRow.bind(this);
  }

  renderRow(rowData, index) {
    const appName = _.get(rowData, 'name');
    return (
      <tr key={index}>
        <td>{appName}</td>
        <td style={{ textAlign: 'left' }}>
          <ul>
            {
            _.map(_.get(rowData, 'collaborators'), (item, email) => (
              <li key={email}>
                {email}
                <span className={s.permission}>
                    (<em>{_.get(item, 'permission')}</em>)
                  </span>
                {
                    _.get(item, 'isCurrentAccount') ?
                      <span className={cx(s.label, s.labelSuccess)}>
                      it's you
                    </span>
                    : null
                  }
              </li>
              ))
          }
          </ul>
        </td>
        <td>
          <ul>
            {
            _.map(_.get(rowData, 'deployments'), (item, email) => (
              <li key={email} style={item === 'Production' ? { color: 'green' } : null} >
                <Link to={`/${appName}/${item}`}>{item}</Link>
              </li>
              ))
          }
          </ul>
        </td>
        <td />
      </tr>
    );
  }

  render() {
    const self = this;
    const tipText = '暂无数据';
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>应用列表</h1>
          <table>
            <tbody>
              <tr>
                <th width="15%">产品名</th>
                <th width="45%">成员</th>
                <th width="20%">Deployments</th>
                <th width="20%">操作</th>
              </tr>
              {
                 this.props.rs.length > 0 ?
                 _.map(this.props.rs, (item, index) => self.renderRow(item, index))
                 :
                 <tr>
                   <td colSpan="4" >{tipText}</td>
                 </tr>
               }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default withStyles(s)(ProductList);
