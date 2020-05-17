import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Skeleton from '@material-ui/lab/Skeleton';
import { sortBy } from '../../utils/commonHelper'

const StateTable = ({ statesData }) => {
    const sortedStates = statesData ? statesData.sort(sortBy("active", "desc")) : null;
    return (
        <>

            <div>
                <Typography gutterBottom variant="h5">
                    State-wise Cases in Australia
                </Typography>
            </div>
            {
                sortedStates?.length > 0 ?
                    (
                        <>
                            <TableContainer component={Paper}>
                                <Table className="table" style={{ animationDelay: '1.2s' }} size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>States</TableCell>
                                            <TableCell align="right">Total</TableCell>
                                            <TableCell align="right">Active</TableCell>
                                            <TableCell align="right">Recovered</TableCell>
                                            <TableCell align="right">Deaths</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {sortedStates.map((row) => (
                                            <TableRow key={row.id}>
                                                <TableCell component="th" scope="row">
                                                    <Link to={"/state/" + row.id}>{row.name}</Link>
                                                </TableCell>
                                                <TableCell align="right">{row.confirmed}</TableCell>
                                                <TableCell align="right">{row.active}</TableCell>
                                                <TableCell align="right">{row.recovered}</TableCell>
                                                <TableCell align="right">{row.deaths}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </>
                    ) :
                    (
                        <>
                            {
                                Array(8).fill(0).map((x, i) => <Skeleton key={i} height={40} animation="wave" />)
                            }
                        </>
                    )
            }
        </>
    )
}
export default StateTable;