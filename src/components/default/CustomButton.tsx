import { StyleSheet, css } from 'aphrodite';
import { Button } from 'react-bootstrap';

const styles = StyleSheet.create({
    custom: {
        color: 'rgba(202, 202, 202, 1)',
        ':focus, :active': {
            outline: 'none',
            boxShadow: 'none'
        },
    },

    secondary: {
        backgroundColor: 'transparent',
        borderColor: 'rgba(71, 71, 71, 0.8)',
        ':hover': {
            backgroundColor: 'rgba(71, 71, 71, 0.8)'
        }
    },

    primary: {
        backgroundColor: '#961dbd',
        borderColor: '#74248f',
        ':hover': {
            backgroundColor: '#74248f'
        }
    }
});

type Props = {
    children?: React.ReactNode,
    [x: string]: any;
}

export default function CustomButton({ children, variant, ...rest }: Props) {
    const getVariantStyle = () => {
        if(variant === 'primary') {
            return styles['primary'];
        }

        if(variant === 'secondary') {
            return styles['secondary'];
        }

        return undefined;
    }

    return (
        <Button variant="primary" className={css(styles.custom, getVariantStyle())} {...rest}>
            {children}
        </Button>
    )
}
