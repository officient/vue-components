<template>
    <div class="budget-usage-container">
        <BudgetUsage :item="item"/>
    </div>
    
</template>

<script>
import BudgetUsage from '../../../lib/components/daysoff/BudgetUsage'

export default {
    components: { BudgetUsage },
    data(){
        return{
            item: {
                "type_id":822,
                "exception_id":-1,
                "minutes_approved":"180",
                "minutes_not_approved":"456",
                "days_approved":"0.5",
                "days_not_approved":"1.0",
                "type":"custom",
                "color":"e9d460",
                "max_yearly_amount_days":"5.0",
                "max_yearly_amount_minutes":0,
                "limitation":"limit_in_half_days",
                "allowed_selfservice":1,
                "interpretation":"time_off",
                "name":"ABC",
                "approval_needed":1
            }
        }
    }
}
</script>
