import { StyleSheet, css } from 'aphrodite';
import { Button } from 'react-bootstrap';

const styles = StyleSheet.create({
    custom: {
        color: 'rgba(202, 202, 202, 1)',
        backgroundColor: 'transparent',
        borderColor: 'rgba(202, 202, 202, 1)',
        ':focus, :active': {
            outline: 'none',
            boxShadow: 'none'
        },
    },

    secondary: {
        backgroundColor: 'rgba(71, 71, 71, 0.8)',
        borderColor: 'rgba(71, 71, 71, 0.8)',
        ':hover': {
            backgroundColor: 'rgba(71, 71, 71, 0.8)'
        }
    },

    primary: {
        backgroundColor: '#c3c2e5',
        borderColor: '#7e7cbc',
        ':hover': {
            backgroundColor: '#c3c2e5'
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
