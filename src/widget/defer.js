/*
 * @Author: yangyuan
 * @Date: 2020-05-28 16:22:25
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-05-28 16:22:46
 * @Description:
 */
export default function(count = 50) {
    return {
        data() {
            return {
                displayPriority: 0
            };
        },
        mounted() {
            this.runDisplayPriority();
        },
        methods: {
            runDisplayPriority() {
                const step = () => {
                    requestAnimationFrame(() => {
                        this.displayPriority++;
                        if (this.displayPriority < count) {
                            step();
                        }
                    });
                };
                step();
            },
            defer(priority) {
                return this.displayPriority >= priority;
            }
        }
    };
}
