import { CSpinner } from '@coreui/react'
import * as API from '../../api/AnnouncementRequest.js'
import { useEffect, useState } from 'react'
import AnnouncementCard from './AnnouncementCard.jsx'

const CACHE_KEY = 'announcements_cache';
const CACHE_TIME = 5 * 60 * 1000; // 5 minutes

const Announcement = () => {
    const [fetching, setFetching] = useState(false)
    const [announcements, setAnnouncements] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        let mounted = true;

        const fetchData = async () => {
            const cachedData = localStorage.getItem(CACHE_KEY);
            const cachedTime = localStorage.getItem(CACHE_KEY + '_time');

            if (cachedData && cachedTime) {
                const isExpired = Date.now() - cachedTime > CACHE_TIME;

                if (!isExpired) {
                    setAnnouncements(JSON.parse(cachedData));
                    return; // 🚀 skip API call
                }
            }

            setFetching(true);
            try {
                const response = await API.getAnnouncement();

                if (mounted) {
                    const data = response.data.data;

                    setAnnouncements(data);

                    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
                    localStorage.setItem(CACHE_KEY + '_time', Date.now());
                }
            } catch (error) {
                console.log(error);
            }
            setFetching(false);
        };

        fetchData();

        return () => {
            mounted = false;
        };
    }, []);

    const filteredAnnouncements = announcements.filter((item) => {
        const term = searchTerm.toLowerCase();

        return (
            item.ANNOUNCEMENT_TITLE?.toLowerCase().includes(term) ||
            item.POSITION_NAME?.toLowerCase().includes(term)
        );
    });

    return (
        <div>
            <div className="border-bottom border-3 border-primary p-2">
                <h3>Announcements</h3>
            </div>

            <div className="my-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by title or position..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {
                fetching ? <CSpinner className='align-self-start my-3' color="primary" /> :
                    <div className='w-100 my-3'>
                        {
                            filteredAnnouncements.length > 0 ? (
                                filteredAnnouncements.map((announcement) => (
                                    <AnnouncementCard
                                        announcement={announcement}
                                        key={announcement.ANNOUNCEMENT_ID}
                                    />
                                ))
                            ) : (
                                <p className="text-center fst-italic my-5 py-5">
                                    No matching announcements found!
                                </p>
                            )
                        }
                    </div>
            }
        </div>
    )
}

export default Announcement