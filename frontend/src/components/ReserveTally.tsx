import { Paper, Button, Typography, Stack } from '@mui/material';
import {useState, useEffect } from 'react';

interface ReserveTallyProps {
    festivalId: string; // tally is scoped
}

export function ReserveTallu({performanceId }: ReserveTallyProps){
    const [count, setCount] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        // TODO get /api/reservations/[performanceId]/count on mount
    }, [performanceId]);
    async function handleReserve(){
        // TODO POST /api/reservations/{performanceId}
        // optimistic update or wait for resp?
    return (
        <Paper elevation={2} sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button variant="contained" onClick={handleReserve} disabled={loading}>
                Reserve
            </Button>
            <Typography variant="body2">
                {count ?? '—'} reserved
            </Typography>
        </Paper>
    );
    }