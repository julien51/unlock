import { Lock } from '~/unlockTypes'
import { CreditCardWithStripeForm } from '../forms/CreditCardWithStripeForm'
import { ReceiptBaseForm } from '../forms/ReceiptBaseForm'
import { SubscriptionForm } from '../forms/SubscriptionForm'
import { UpdatePriceForm } from '../forms/UpdatePriceForm'
import { SettingCard } from './SettingCard'

interface SettingPaymentsProps {
  lockAddress: string
  network: number
  isManager: boolean
  isLoading: boolean
  lock?: Lock
}

export const SettingPayments = ({
  lockAddress,
  network,
  isManager,
  isLoading,
  lock,
}: SettingPaymentsProps) => {
  return (
    <div className="grid grid-cols-1 gap-6">
      <SettingCard
        label="Price"
        description="The price that the lock contract is charging for one membership, whether it is a new one or a renewal."
        isLoading={isLoading}
      >
        <UpdatePriceForm
          lockAddress={lockAddress}
          network={network}
          price={parseFloat(lock?.keyPrice ?? '0')}
          isManager={isManager}
          disabled={!isManager}
        />
      </SettingCard>

      <SettingCard
        label="Credit Card Payment with Stripe"
        description="Accept credit cards, Apple Pay and Google Pay. Service & Credit card processing fees will be applied to the price paid by the member."
        isLoading={isLoading}
      >
        <CreditCardWithStripeForm
          lockAddress={lockAddress}
          network={network}
          isManager={isManager}
          disabled={!isManager}
        />
      </SettingCard>

      <SettingCard
        label="Subscription"
        description="Incentivize renewals of memberships when they expire. Users will need to have the previously approved the renewals, as well as have a sufficient amount of tokens in their wallets."
        isLoading={isLoading}
      >
        <SubscriptionForm
          lockAddress={lockAddress}
          network={network}
          isManager={isManager}
          disabled={!isManager}
          lock={lock}
          price={parseFloat(lock?.keyPrice ?? '0')}
        />
      </SettingCard>

      <SettingCard
        label="Receipts"
        description="Update the supplier information to be shown on receipts."
        isLoading={isLoading}
      >
        <ReceiptBaseForm
          lockAddress={lockAddress}
          network={network}
          isManager={isManager}
          disabled={!isManager}
        />
      </SettingCard>
    </div>
  )
}
