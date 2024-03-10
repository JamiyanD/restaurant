import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import MailIcon from '@mui/icons-material/Mail';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export default function Footer() {
    return (
        <div className="flex justify-center bg-slate-700">
            <div className='w-2/3 h-96 flex justify-between items-center'>
                <div className='h-1/2 flex flex-col justify-between'>
                    <h1 className="text-white text-3xl">CONTACT US</h1>
                    <div className='flex'>
                        <LocationOnIcon className='text-white' />
                        <p className='text-white'>1234 Naadamchid street, Ulaanbaatar, Mongolia</p>
                    </div>
                    <div className='flex'>
                        <PhoneIcon className='text-white' />
                        <p className='text-white'>(+976) 99119911</p>
                    </div>
                    <div className='flex'>
                        <MailIcon className='text-white' />
                        <p className='text-white'>restaurant@gmail.com</p>
                    </div>
                </div>
                <div className='h-1/2 flex flex-col justify-between'>
                    <h1 className="text-white text-2xl">OPENING TIMES</h1>
                    <div className='flex'>
                        <AccessTimeIcon className="text-white"/>
                        <p className="text-white">09:30 AM – 12:00 PM</p>
                    </div>
                    <div className='flex'>
                        <CalendarMonthIcon className="text-white"/>
                        <p className="text-white">Every Day</p>
                    </div>
                </div>
                <div className='h-1/2 flex flex-col justify-between'>
                    <h1 className="text-white text-2xl">SUBSCRIBE TO OUR NEWSLETTER FOR UPDATES & SPECIAL OFFERS</h1>
                    <div className='flex'>
                        <input type="email" placeholder='Email...' />
                        <div className='bg-slate-200'>
                            Submit
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
