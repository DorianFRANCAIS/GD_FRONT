import React from 'react'
import useLayoutStyle from './Layout.style'

const Layout = ({ children } : {
    children: React.ReactNode
}) => {

    const { classes } = useLayoutStyle();

  return (
    <div className={classes.wrapper}>
        {children}
    </div>
  )
}

export default Layout