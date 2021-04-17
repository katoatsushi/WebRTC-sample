import { useState, useEffect  } from 'react';

// useStateでdimensionの状態を管理する
// リサイズされたらdimensionsのサイズを変更するようイベントハンドラを設置

const defaultDimensions = { width: 0, height: 0}

const useDimensions = (targetRef) => {
    let [ dimensions, setDimensions ] = useState(defaultDimensions)
    const node = targetRef.current;
    const updateDimensions = (node) => {
        
        return node === null ? 
        defaultDimensions
        : {
            width: node.offsetWidth,
            height: node.offsetHeight
        };
    };
    dimensions = updateDimensions(node);

    useEffect(() => {
        const resizeDimensions = () => {
            setDimensions(updateDimensions(node))
        }
        window.removeEventListener('resize', resizeDimensions)
        window.addEventListener('resize', resizeDimensions)
    },[node])
    return dimensions
}

export default useDimensions