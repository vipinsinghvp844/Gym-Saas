import { X, Search } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../../services/api";
import Avatar from "../ui/Avatar";
import GymLoader from "../ui/GymLoader";

const ClassMembersDrawer = ({ isOpen, onClose, classId }) => {

    const [loading, setLoading] = useState(false);
    const [members, setMembers] = useState([]);
    const [search, setSearch] = useState("");
    const [showEnroll, setShowEnroll] = useState(false);
    const [gymMembers, setGymMembers] = useState([]);
    const [memberSearch, setMemberSearch] = useState("");


    /* ==========================
       FETCH MEMBERS
    ========================== */
    const loadMembers = async () => {
        if (!classId) return;

        try {
            setLoading(true);

            const res = await api.get(
                "/gymadmin/classes/members.php",
                { params: { class_id: classId } }
            );

            if (res.data.status) {
                setMembers(res.data.data);
            }

        } finally {
            setLoading(false);
        }
    };

    const loadGymMembers = async () => {
        const res = await api.get(
            "/gymadmin/members/list.php",
            { params: { limit: 50 } }
        );

        if (res.data.status) {
            setGymMembers(res.data.data);
        }
    };
    useEffect(() => {
        if (showEnroll) loadGymMembers();
    }, [showEnroll]);
    const enrollMember = async (memberId) => {
        try {

            await api.post("/gymadmin/classes/enroll.php", {
                class_id: classId,
                member_id: memberId
            });

            setShowEnroll(false);
            loadMembers(); // refresh list

        } catch (e) {
            alert(e?.response?.data?.message || "Enroll failed");
        }
    };

    const removeMember = async (memberId) => {

        if (!window.confirm("Remove this member from class?"))
            return;

        try {

            await api.post("/gymadmin/classes/remove-enroll.php", {
                class_id: classId,
                member_id: memberId
            });

            loadMembers(); // refresh list

        } catch (e) {
            alert(e?.response?.data?.message || "Remove failed");
        }
    };



    useEffect(() => {
        if (isOpen) loadMembers();
    }, [isOpen, classId]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex">

            {/* Overlay */}
            <div
                className="flex-1 bg-black/40"
                onClick={onClose}
            />

            {/* Drawer */}
            <div className="w-full max-w-md bg-white shadow-2xl h-full flex flex-col">

                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b">
                    <h2 className="text-lg font-semibold">
                        Class Members
                    </h2>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setShowEnroll(true)}
                            className="px-3 h-8 text-xs bg-purple-600 text-white rounded-lg"
                        >
                            + Enroll
                        </button>

                        <button onClick={onClose}>
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>


                {/* Search */}
                <div className="p-4 border-b">
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                        <input
                            placeholder="Search member..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full h-10 pl-9 pr-3 bg-slate-50 border rounded-lg text-sm"
                        />
                    </div>
                </div>

                {/* List */}
                <div className="flex-1 overflow-y-auto">

                    {loading && (
                        <div className="p-10 text-center">
                            <GymLoader />
                        </div>
                    )}

                    {!loading && members.length === 0 && (
                        <div className="p-10 text-center text-slate-500">
                            No members enrolled
                        </div>
                    )}

                    {!loading && members
                        .filter(m =>
                            `${m.first_name} ${m.last_name}`
                                .toLowerCase()
                                .includes(search.toLowerCase())
                        )
                        .map(member => (
                            <div
                                key={member.enrollment_id}
                                className="flex items-center justify-between px-4 py-3 border-b hover:bg-slate-50"
                            >
                                <div className="flex items-center gap-3">

                                    <Avatar
                                        firstName={member.first_name}
                                        lastName={member.last_name}
                                        image={member.avatar}
                                        size={36}
                                    />

                                    <div>
                                        <p className="text-sm font-semibold">
                                            {member.first_name} {member.last_name}
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            {member.phone}
                                        </p>
                                    </div>
                                </div>

                                {/* remove button later */}
                                <button
                                    onClick={() => removeMember(member.member_id)} className="text-xs text-red-600 hover:underline">
                                    Remove
                                </button>
                            </div>
                        ))}
                </div>
            </div>
            {showEnroll && (
                <div className="absolute inset-0 bg-white z-10 flex flex-col">

                    {/* Header */}
                    <div className="p-4 border-b flex justify-between">
                        <h3 className="font-semibold">Enroll Member</h3>
                        <button onClick={() => setShowEnroll(false)}>Close</button>
                    </div>

                    {/* Search */}
                    <div className="p-4 border-b">
                        <input
                            placeholder="Search member..."
                            value={memberSearch}
                            onChange={(e) => setMemberSearch(e.target.value)}
                            className="w-full h-10 px-3 bg-slate-50 border rounded-lg text-sm"
                        />
                    </div>

                    {/* Members */}
                    <div className="flex-1 overflow-y-auto">

                        {gymMembers
                            .filter(m =>
                                `${m.first_name} ${m.last_name}`
                                    .toLowerCase()
                                    .includes(memberSearch.toLowerCase())
                            )
                            .map(m => (

                                <div
                                    key={m.id}
                                    className="flex items-center justify-between px-4 py-3 border-b hover:bg-slate-50"
                                >
                                    <div className="flex items-center gap-3">
                                        <Avatar
                                            firstName={m.first_name}
                                            lastName={m.last_name}
                                            size={36}
                                        />

                                        <div>
                                            <p className="text-sm font-semibold">
                                                {m.first_name} {m.last_name}
                                            </p>
                                            <p className="text-xs text-slate-500">
                                                {m.phone}
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => enrollMember(m.id)}
                                        className="text-xs bg-purple-600 text-white px-3 py-1 rounded"
                                    >
                                        Enroll
                                    </button>
                                </div>
                            ))}
                    </div>
                </div>
            )}

        </div>
    );
};

export default ClassMembersDrawer;
