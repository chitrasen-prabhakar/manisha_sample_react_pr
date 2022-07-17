import { Tree, Col } from 'antd'
import './styles.less';
const ExpandableTree = props => {
  return (
    <div className="expandable-tree">
        {props.title}
        <Tree {...props}></Tree>
    </div>
  )
}

export default ExpandableTree
