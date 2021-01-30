import React, { useEffect, useState, FormEvent } from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import CropFreeIcon from '@material-ui/icons/CropFree';
import { useRedeemableCodeService } from 'contexts';

export default function RedeemableCodeTabContent() {
  const [
    redeemableCodeState,
    redeemableCodeService,
  ] = useRedeemableCodeService();
  const redeemableCodes = redeemableCodeState?.codes ?? [];

  useEffect(() => {
    if (redeemableCodeService) {
      redeemableCodeService.refreshRedeemableCodes();
    }
  }, [redeemableCodeService]);

  const createFacebookDormCode = () => {
    redeemableCodeService?.createRedeemableCode();
  };

  return (
    <>
      <Typography variant="h5" component="h2" style={{ margin: '8px' }}>
        Promo codes
      </Typography>
      <Button
        value="submit"
        variant="contained"
        color="primary"
        size="small"
        onClick={createFacebookDormCode}
      >
        Create code
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Code</TableCell>
              <TableCell>QR</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {redeemableCodes.map((redeemableCode) => (
              <TableRow key={redeemableCode.id}>
                <TableCell>{redeemableCode.code}</TableCell>
                <TableCell>
                  <IconButton role="button">
                    <CropFreeIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}