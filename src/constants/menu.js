import {
    DollarSign,
     LogIn
} from 'react-feather';

export const MENUITEMS = [
    {
        title: 'Sales', icon: DollarSign, type: 'sub', active: false, children: [
            { path: '/sales/orders', title: 'Orders', type: 'link' },
            
        ]
    }
]
