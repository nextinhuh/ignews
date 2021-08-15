import { useSession } from 'next-auth/client';
import { useToasts } from "react-toast-notifications";
import { useRouter } from 'next/dist/client/router';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stipe-js';
import styles from './styles.module.scss';

interface SubscribeButtonProps {
    priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
    const [session] = useSession();
    const router = useRouter();
    const { addToast } = useToasts();

    async function handleSubscribe() {
        if (!session) {
            addToast("Você deve está autenticado para se inscrever!", { appearance: "warning" })
            return;
        }

        if (session.activeSubscription) {
            addToast("Seu usuário já esta inscrito!", { appearance: "success" })
            router.push('/');
            return;
        }

        try {
            const response = await api.post('/subscribe')

            const { sessionId } = response.data;

            const stripe = await getStripeJs()

            await stripe.redirectToCheckout({ sessionId })
        } catch (error) {
            alert(error.message)
        }

    }

    return (
        <button
            type="button"
            className={styles.subscribeButton}
            onClick={handleSubscribe}
        >
            Subscribe Now
        </button>
    )
}