import { Paper, Button, Typography } from '@mui/material';
import {useState, useEffect } from 'react';

interface ReserveTallyProps {
    performanceId: string; // tally is scoped
}

export function ReserveTally({performanceId }: ReserveTallyProps) {
    const [count, setCount] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        // TODO get /api/reservations/[performanceId]/count on mount
    }, [performanceId]);

    async function handleReserve() {
        // optimistic update or wait for resp?
        setLoading(true);
        try {
            // TODO POST /api/reservations/{performanceId}
            setCount((currentCount) => (currentCount ?? 0) + 1);
        } finally {
            setLoading(false);
        }
    }

    return (
            <Paper elevation={2} sx={{p: 2, display: 'flex', alignItems: 'center', gap: 2}}>
                <Button variant="contained" onClick={handleReserve} disabled={loading}>
                    Reserve
                </Button>
                <Typography variant="body2">
                    {count ?? '—'} Reserved
                </Typography>
            </Paper>
    );
}